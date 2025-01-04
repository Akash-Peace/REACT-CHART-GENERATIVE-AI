import './App.css';
import Chart from './components/chart.js';
import CustomPanel from './components/custom-panel.js';
import { useState, useEffect, useRef } from 'react';
import CommonOptions from './components/common-options.js';
import { FileUploader } from "react-drag-drop-files";
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { initialOption, defaultChartTypes, cacheId, cacheCapacity } from './configs/initial-configs.js';
import cloneDeep from 'lodash/cloneDeep';
import { extractedDataContext } from './context/extracted-data-context.js';
import loadingGif from './assets/loading.gif';
import About from './components/about.js';

function App() {

  const [options, setOptions] = useState([]);
  const [chartTypes, setChartTypes] = useState(defaultChartTypes);
  const [defaultOption, setDefaultOption] = useState(cloneDeep(initialOption));
  const [isAddChartMenuOpen, setIsAddChartMenuOpen] = useState(false);
  const [customPanel, setCustomPanel] = useState(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [onLoading, setOnLoading] = useState(false);
  const [extractedCategories, setExtractedCategories] = useState(null);
  const [extractedSeries, setExtractedSeries] = useState(null);

  const chartMenuRef = useRef(null);
  const addChartButtonRef = useRef(null);
  const lastChartRef = useRef(null);

  const uri = process.env.NODE_ENV === 'production' ? 'https://image-to-chart-graphql-server.vercel.app/' : 'http://localhost:5000/';
  const client = new ApolloClient({ uri, cache: new InMemoryCache() });

  let dataLabelPrefix = '', dataLabelSuffix = '';

  useEffect(() => {
    const handleClickEvent = (event) => {
      if (addChartButtonRef?.current?.contains(event?.target)) {
        setIsAddChartMenuOpen((prev) => !prev);
      } else if (chartMenuRef.current && !chartMenuRef.current.contains(event.target)) {
        setIsAddChartMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  }, []);

  const handleChart = (event) => {
    const type = event?.target?.value || event;
    const chartOption = chartTypes.find((chartType) => chartType.type === type);
    chartOption.enabled = !chartOption.enabled;
    if (chartOption.enabled) {
      options.push({ ...defaultOption, chartType: type });
      setTimeout(() => {
        lastChartRef?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } else {
      options.splice(options.findIndex((option) => option.chartType === type), 1);
    }
    setChartTypes([...chartTypes])
    setOptions([...options]);
  }

  const handleOptionChange = (type, selectedOptions, chartType, title) => {
    if (type === 'categories') {
      options.forEach((option) => {
        option.categories = selectedOptions;
      });
    } else if (type === 'series') {
      options.forEach((option) => {
        option.series = selectedOptions;
      });
    } else if (type === 'custom') {
      options.forEach((option) => {
        if (option.chartType === chartType) {
          if (selectedOptions) {
            option.custom = selectedOptions;
          } else if ('head' in title) {
            option.title = title.head;
          } else if ('yAxisTitle' in title) {
            option.yAxisTitle = title.yAxisTitle;
          }
        }
      });
    }
    setOptions(cloneDeep(options));
  }

  const handleCustomPanel = (customValue) => {
    setCustomPanel(cloneDeep(customValue));
  }

  const handleChange = async (file) => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
      const hashId = await getHashId(base64String);
      const hashValue = getCacheData(hashId);
      if (hashValue) {
        updateDefaultOption(hashValue);
      } else {
        setOnLoading(true);
        await fetchChartData(base64String, file.type);
        setOnLoading(false);
      }
    };
    reader.onerror = (error) => {
      alert('File throws error: ', error);
    };
    reader.readAsDataURL(file);
  };

  const getCacheData = (hashId) => {
    const fetchCache = localStorage.getItem(cacheId);
    if (fetchCache) {
      const cacheObj = JSON.parse(fetchCache);
      if (cacheObj.hasOwnProperty(hashId)) {
        const hv = cacheObj[hashId];
        delete cacheObj[hashId];
        cacheObj[hashId] = hv;
        localStorage.setItem(cacheId, JSON.stringify(cacheObj));
        return hv;
      }
    }
  };

  const setCacheData = (hashId, hashValue) => {
    const fetchCache = localStorage.getItem(cacheId);
    let cacheObj;
    if (fetchCache) {
      cacheObj = JSON.parse(fetchCache);
      cacheObj[hashId] = hashValue;
      if (Object.keys(cacheObj).length > cacheCapacity) {
        const oldestKey = Object.keys(cacheObj)[0];
        delete cacheObj[oldestKey];
      }
    } else {
      cacheObj = { [hashId]: hashValue };
    }
    localStorage.setItem(cacheId, JSON.stringify(cacheObj));
  };


  const fetchChartData = async (base64String, fileType) => {
    const GET_CHART_DATA = gql`
      query GetChartData($image: String!, $fileType: String!) {
        getChartData(image: $image, fileType: $fileType) {
          type
          title
          yAxisTitle
          dataLabelPrefix
          dataLabelSuffix
          series {
            name
            color
            data
          }
          categories
        }
      }
    `;

    try {
      const { loading, error, data } = await client.query({
        query: GET_CHART_DATA,
        variables: { image: base64String, fileType },
      });

      if (loading) return;
      if (error) {
        setFile(null);
        setFileError(error?.message || 'Something went wrong');
        return;
      }

      if (data) {
        updateDefaultOption(data);
        // Cache the data
        getHashId(base64String).then((hashId) => setCacheData(hashId, data));
      }
    } catch (error) {
      setFile(null);
      setFileError(error?.networkError?.result?.errors?.[0]?.message || error?.message || 'Something went wrong');
    }
  };

  const updateDefaultOption = (data) => {
    defaultOption.chartType = data.getChartData?.type;
    defaultOption.categories = data.getChartData?.categories;
    defaultOption.series = data.getChartData?.series;
    defaultOption.title = data.getChartData?.title?.trim()?.slice(0, 50);
    defaultOption.yAxisTitle = data.getChartData?.yAxisTitle?.trim()?.slice(0, 30);
    chartTypes.find((chartType) => chartType.type === defaultOption.chartType).enabled = true;
    dataLabelPrefix = data.getChartData?.dataLabelPrefix;
    dataLabelSuffix = data.getChartData?.dataLabelSuffix;
    setExtractedCategories(data.getChartData?.categories);
    setExtractedSeries(data.getChartData?.series);
    setDefaultOption({ ...defaultOption });
    setOptions([defaultOption]);
    setChartTypes([...chartTypes]);
  };

  const getHashId = async (base64String) => {
    const encodedData = new TextEncoder().encode(base64String);
    // we need to encode the data (convert the base64String to a Uint8Array)
    // before passing it to crypto.subtle.digest is due to how the Web Crypto API works.
    // The crypto.subtle.digest method expects the input to be binary data, not a plain string.
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  return (
    <div className="App">
      {
        extractedCategories ? (<>
          <extractedDataContext.Provider value={{ extractedCategories, extractedSeries, dataLabelPrefix, dataLabelSuffix }}>
            <div className='app-header'>
              <div className='app-header-content'>
                <div className='app-header-content-left'>
                  <img src={URL.createObjectURL(file)} alt="Uploaded image" className='app-header-image' />
                  <h2> to custom charts</h2>
                </div>
                <div>
                  <h2 style={{ cursor: 'pointer' }} ref={addChartButtonRef}>+ Add Charts</h2>
                  {isAddChartMenuOpen && (
                    <div
                      ref={chartMenuRef}
                      className='app-add-chart-menu'
                    >
                      {chartTypes.map((chartType) => (
                        <label key={chartType.type} className='app-add-chart-menu-item'>
                          <input
                            type="checkbox"
                            value={chartType.type}
                            checked={chartType.enabled}
                            onChange={(event) => handleChart(event)}
                          />
                          &nbsp;{chartType.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <CommonOptions optionChange={(type, selectedOptions) => handleOptionChange(type, selectedOptions)} />
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: customPanel ? 'calc(100% - 250px)' : '100%' }}>
                {options.length ?
                  options.map((option, index) => <Chart scrollRef={index === options.length - 1 ? lastChartRef : null} key={option.chartType + index} option={option} openCustomPanel={(type, customValue, title, yAxisTitle) => handleCustomPanel({ type, custom: customValue, title, yAxisTitle })} deleteChart={(type) => handleChart(type)} />) :
                  <h2 className='app-status'>No charts added</h2>}
                <About />
              </div>
              {customPanel && <CustomPanel close={() => setCustomPanel(null)} update={(customValue, type, title) => handleOptionChange('custom', customValue, type, title)} customData={customPanel} />}
            </div>
          </extractedDataContext.Provider>
        </>
        ) : (
          <>
            <h2>Switch chart image to custom charts (BETA)</h2>
            <div className='app-upload-container'>
              {onLoading ? <div className='app-loading'><img className='app-loading-gif' src={loadingGif} alt='...' /><h2 className='app-status'>Analyzing the image</h2></div> :
                <>
                  <FileUploader
                    handleChange={handleChange}
                    name="drag-and-drop-files"
                    types={["JPG", "PNG", "JPEG"]}
                    label="Upload or drag a chart image here | Supported charts: Column, Bar, Line | Max size: 5MB | Min size: 0.1MB | Supported file:&nbsp;"
                    uploadedLabel="Uploaded Successfully"
                    maxSize={5}
                    minSize={0}
                  />
                  {fileError && <div className='app-upload-error'>
                    &#128683; &nbsp;{fileError}
                  </div>}
                </>}
            </div>
          </>
        )
      }
    </div>
  );
}

export default App;
