import { useRef, useState, useEffect, useContext } from "react";
import './chart.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import cloneDeep from 'lodash/cloneDeep';
import { extractedDataContext } from "../context/extracted-data-context";
import { LargeNumbers } from "../configs/initial-configs";

const Chart = ({ option, openCustomPanel, deleteChart, scrollRef }) => {

    const [isFullScreen, setIsFullScreen] = useState(false);

    const fullScreenMode = useRef(null);

    const { dataLabelPrefix, dataLabelSuffix } = useContext(extractedDataContext);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const setRefs = (refs) => {
        fullScreenMode.current = refs;
        if (scrollRef) {
            scrollRef.current = refs;
        }
    }

    const openFullScreen = () => {
        if (fullScreenMode.current.requestFullscreen) {
            fullScreenMode.current.requestFullscreen(); // Standard API
        } else if (fullScreenMode.current.mozRequestFullScreen) {
            fullScreenMode.current.mozRequestFullScreen(); // For Firefox
        } else if (fullScreenMode.current.webkitRequestFullscreen) {
            fullScreenMode.current.webkitRequestFullscreen(); // For Chrome, Safari, and Opera
        } else if (fullScreenMode.current.msRequestFullscreen) {
            fullScreenMode.current.msRequestFullscreen(); // For IE/Edge
        }
    };

    const formatNumber = (value) => {
        let suffix = "";
        let divisor = 1;
      
        if (value >= LargeNumbers.trillion) {
          suffix = "T";
          divisor = LargeNumbers.trillion;
        } else if (value >= LargeNumbers.billion) {
          suffix = "B";
          divisor = LargeNumbers.billion;
        } else if (value >= LargeNumbers.million) {
          suffix = "M";
          divisor = LargeNumbers.million;
        } else if (value >= LargeNumbers.thousand) {
          suffix = "K";
          divisor = LargeNumbers.thousand;
        }
      
        const formattedValue = divisor > 1 ? (value / divisor).toFixed(2).replace(/\.?0+$/, "") : value.toFixed(2).replace(/\.?0+$/, "");
        return formattedValue + suffix;
    };

    const options = {
        chart: {
            type: option.chartType,
        },
        credits: { enabled: false },
        title: {
            text: option.title,
        },
        xAxis: {
            categories: option.categories,
            gridLineWidth: option.custom.enableGridLines ? 2 : undefined,
            reversedStacks: option.custom.enableReverseStack,
        },
        yAxis: {
            title: {
                text: option.yAxisTitle,
            },
            gridLineWidth: option.custom.enableGridLines ? 2 : 1,
            minorTicks: option.custom.enableMinorGridLines,
            opposite: option.custom.enableOppositeAxis,
            reversedStacks: option.custom.enableReverseStack,
            formatter: function () {
                return formatNumber(this.value);
            },
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: option.custom.enableDataLabels,
                    inside: option.custom.enableLabelInside,
                    format: option.custom.enableStacked100 ? '{point.percentage:.1f}%' : null,
                    formatter: function () {
                        return dataLabelPrefix + formatNumber(this.y) + dataLabelSuffix;
                    }
                },
                lineWidth: option.custom.enableBoldLines ? 4 : 2,
                stacking: option.custom.enableStacked100 ? 'percent' : (option.custom.enableStacked ? 'normal' : null),
                dashStyle: option.custom.enableDash ? 'dash' : 'solid',
                shadow: option.custom.enableShadow
            }
        },
        legend: {
            enabled: option.custom.enableLegend,
            reversed: option.custom.enableReverseLegends,
            rtl: option.custom.enableSymbolOnRight,
            symbolRadius: option.custom.enableSquareSymbol ? 0 : 6,
            align: option.custom.enableLegendsOnLeft ? 'left' : 'center',
            verticalAlign: option.custom.enableLegendsOnLeft ? 'middle' : 'bottom',
            layout: option.custom.enableLegendsOnLeft ? 'vertical' : 'horizontal',
        },
        series: option.series,
    };

    return (
        <div ref={setRefs} className="card-container">
            {!isFullScreen && (<div className="card-header">
                <h3 onClick={openFullScreen}>&#8689;</h3>
                <h3 onClick={() => openCustomPanel(option.chartType, option.custom, option.title, option.yAxisTitle)}>&#x22EF;</h3>
                <h3 onClick={() => deleteChart(option.chartType)}>&#10060;</h3>
            </div>)}
            <HighchartsReact containerProps={{ className: 'hc-container' }} highcharts={Highcharts} options={cloneDeep(options)} />
        </div>
    );
}

export default Chart;
