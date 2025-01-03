import './common-options.css';
import { useState, useContext } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { extractedDataContext } from '../context/extracted-data-context';

const CommonOptions = ({ optionChange }) => {

    const { extractedCategories, extractedSeries } = useContext(extractedDataContext);

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isSeriesOpen, setIsSeriesOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedCategoriesOptions, setSelectedCategoriesOptions] = useState([...extractedCategories]);
    const [selectedSeriesOptions, setSelectedSeriesOptions] = useState(cloneDeep(extractedSeries));

    const categoriesClicked = () => {
        setIsCategoriesOpen((prev) => !prev);
        setIsSeriesOpen(false);
        setOptions([...extractedCategories]);
    }

    const seriesClicked = () => {
        setIsSeriesOpen((prev) => !prev);
        setIsCategoriesOpen(false);
        setOptions(extractedSeries.map((serie) => serie.name));
    }

    const handleCheckboxChange = (option) => {
        if (isCategoriesOpen) {
            const cIndex = selectedCategoriesOptions.indexOf(option);
            if (cIndex > -1) {
                selectedCategoriesOptions.splice(cIndex, 1);
                setSelectedSeriesOptions(selectedSeriesOptions.map((serie) => { serie.data.splice(cIndex, 1); return serie }));
            } else {
                selectedCategoriesOptions.push(option);
                const DefaultCIndex = extractedCategories.indexOf(option);
                setSelectedSeriesOptions(selectedSeriesOptions.map((serie) => {
                    const dataFromDefaultSeries = extractedSeries.find((s) => s.name === serie.name).data[DefaultCIndex];
                    serie.data.push(dataFromDefaultSeries); return serie
                }));
            }
            setSelectedCategoriesOptions([...selectedCategoriesOptions]);
            optionChange('categories', selectedCategoriesOptions);
            optionChange('series', selectedSeriesOptions);
        } else {
            const sIndex = selectedSeriesOptions.findIndex((serie) => serie.name === option);
            if (sIndex > -1) {
                selectedSeriesOptions.splice(sIndex, 1);
            } else {
                const eSeries = cloneDeep(extractedSeries.find((serie) => serie.name === option));
                eSeries.data = selectedCategoriesOptions.map((category) => eSeries.data[extractedCategories.indexOf(category)]);
                selectedSeriesOptions.push(eSeries);
            }
            setSelectedSeriesOptions(cloneDeep(selectedSeriesOptions));
            optionChange('series', selectedSeriesOptions);
        }
    }

    return (
        <>
            <div className='common-options-container'>
                <h3>x-axis: </h3>
                <h2 className='common-options-prompt' onClick={categoriesClicked}>{extractedCategories.length} categories</h2>
                <h3>legends: </h3>
                <h2 className='common-options-prompt' onClick={seriesClicked}>{extractedSeries.length} series</h2>
            </div>
            {(isCategoriesOpen || isSeriesOpen) && (
                <div className='common-options-list'>
                    {options.map((option) => (
                        <label key={option} className='common-options-label'>
                            <input
                                type="checkbox"
                                value={option}
                                checked={isCategoriesOpen ? selectedCategoriesOptions.includes(option) : (selectedSeriesOptions.findIndex((serie) => serie.name === option) > -1)}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            &nbsp;{option}
                        </label>
                    ))}
                </div>
            )}
        </>
    );
}

export default CommonOptions;
