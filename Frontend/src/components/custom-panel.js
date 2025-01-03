import './custom-panel.css';
import { useState, useEffect } from "react";
import cloneDeep from 'lodash/cloneDeep';

const CustomPanel = ({ close, update, customData }) => {
    const [custom, setCustom] = useState(customData.custom);
    const [heading, setHeading] = useState(customData.title);
    const [yAxisTitle, setYAxisTitle] = useState(customData.yAxisTitle);

    useEffect(() => {
        setHeading(customData.title);
        setYAxisTitle(customData.yAxisTitle);
        setCustom(cloneDeep(customData.custom));
    }, [customData]);

    const handleUpdate = (newCustom) => {
        setCustom(newCustom);
        update(newCustom, customData.type);
    }

    const handleTitle = (newTitle) => {
        if (newTitle.length <= 50) {
            setHeading(newTitle);
            update(null, customData.type, { head: newTitle });
        }
    }

    const handleYAxisTitle = (newTitle) => {
        if (newTitle.length <= 30) {
            setYAxisTitle(newTitle);
            update(null, customData.type, { yAxisTitle: newTitle });
        }
    }

    return (
        <div className='custom-panel-container'>
            <div className='custom-panel-heading'>
                <input className='custom-panel-text-field' value={heading} onChange={(event) => handleTitle(event.target.value)} type="text" placeholder="Enter chart name" />
                <h3 style={{ cursor: 'pointer' }} onClick={() => close()}>&#10060;</h3>
            </div>
            <div className='custom-panel-content'>
                {customData.type === 'line' ? (
                    <>
                        <label className='custom-panel-option'>
                            <input type="checkbox" checked={custom.enableDash} onChange={(event) => handleUpdate({ ...custom, enableDash: event.target.checked }, customData.type)} />
                            &nbsp; Dashed line
                        </label>
                        <label className='custom-panel-option'>
                            <input type="checkbox" checked={custom.enableBoldLines} onChange={(event) => handleUpdate({ ...custom, enableBoldLines: event.target.checked }, customData.type)} />
                            &nbsp; Bold line
                        </label>
                    </>
                ) : (
                    <>
                        <label className='custom-panel-option'>
                            <input type="checkbox" checked={custom.enableStacked} onChange={(event) => handleUpdate({ ...custom, enableStacked: event.target.checked }, customData.type)} />
                            &nbsp; Stack
                        </label>
                        <label className='custom-panel-option'>
                            <input type="checkbox" checked={custom.enableStacked100} onChange={(event) => handleUpdate({ ...custom, enableStacked100: event.target.checked }, customData.type)} />
                            &nbsp; 100% Stack
                        </label>
                        <label className='custom-panel-option'>
                            <input type="checkbox" checked={custom.enableReverseStack} onChange={(event) => handleUpdate({ ...custom, enableReverseStack: event.target.checked }, customData.type)} />
                            &nbsp; Reverse data points
                        </label>
                        <label className='custom-panel-option'>
                            <input type="checkbox" checked={custom.enableLabelInside} onChange={(event) => handleUpdate({ ...custom, enableLabelInside: event.target.checked }, customData.type)} />
                            &nbsp; Show labels inside
                        </label>
                        <label className='custom-panel-option'>
                            <input type="checkbox" checked={custom.enableSquareSymbol} onChange={(event) => handleUpdate({ ...custom, enableSquareSymbol: event.target.checked }, customData.type)} />
                            &nbsp; Legend square symbol
                        </label>
                    </>
                )
                }
                <label className='custom-panel-option'>
                    <input type="checkbox" checked={custom.enableDataLabels} onChange={(event) => handleUpdate({ ...custom, enableDataLabels: event.target.checked }, customData.type)} />
                    &nbsp; Show data labels
                </label>
                <label className='custom-panel-option'>
                    <input type="checkbox" checked={custom.enableLegend} onChange={(event) => handleUpdate({ ...custom, enableLegend: event.target.checked }, customData.type)} />
                    &nbsp; Show legends
                </label>
                <label className='custom-panel-option'>
                    <input type="checkbox" checked={custom.enableGridLines} onChange={(event) => handleUpdate({ ...custom, enableGridLines: event.target.checked }, customData.type)} />
                    &nbsp; Show grid lines
                </label>
                <label className='custom-panel-option'>
                    <input type="checkbox" checked={custom.enableShadow} onChange={(event) => handleUpdate({ ...custom, enableShadow: event.target.checked }, customData.type)} />
                    &nbsp; Show shadow
                </label>
                <label className='custom-panel-option'>
                    <input type="checkbox" checked={custom.enableMinorGridLines} onChange={(event) => handleUpdate({ ...custom, enableMinorGridLines: event.target.checked }, customData.type)} />
                    &nbsp; Show minor grid lines
                </label>
                <label className='custom-panel-option'>
                    <input type="checkbox" checked={custom.enableOppositeAxis} onChange={(event) => handleUpdate({ ...custom, enableOppositeAxis: event.target.checked }, customData.type)} />
                    &nbsp; Switch to opposite axis
                </label>
                <label className='custom-panel-option'>
                    <input type="checkbox" checked={custom.enableReverseLegends} onChange={(event) => handleUpdate({ ...custom, enableReverseLegends: event.target.checked }, customData.type)} />
                    &nbsp; Reverse legends
                </label>
                <label className='custom-panel-option' title='Switch legends symbol to right'>
                    <input type="checkbox" checked={custom.enableSymbolOnRight} onChange={(event) => handleUpdate({ ...custom, enableSymbolOnRight: event.target.checked }, customData.type)} />
                    &nbsp; Switch legends symbol to right
                </label>
                <label className='custom-panel-option'>
                    <input type="checkbox" checked={custom.enableLegendsOnLeft} onChange={(event) => handleUpdate({ ...custom, enableLegendsOnLeft: event.target.checked }, customData.type)} />
                    &nbsp; Switch legends to left
                </label>
                <p>Y-axis title</p>
                <input className='custom-panel-yaxistitle-option' value={yAxisTitle} onChange={(event) => handleYAxisTitle(event.target.value)} type="text" placeholder="Enter Y-Axis name" />
            </div>
        </div>
    );
}

export default CustomPanel;
