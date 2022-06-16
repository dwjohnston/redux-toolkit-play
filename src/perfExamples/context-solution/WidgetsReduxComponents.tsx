/*
 * COPYRIGHT NOTICE
 * All source code contained within the Cydarm cybersecurity software provided by Cydarm
 * Technologies Pty Ltd ABN 17 622 236 113 (Company) is the copyright of the Company and
 * protected by copyright laws. Redistribution or reproduction of this material is strictly prohibited
 * without prior written permission of the Company. All rights reserved.
 */
import React from 'react';
import { useWidgetsContext, WidgetsContextProvider } from './WidgetsContext';
import { Provider } from 'react-redux'
import { store, useWidgets } from './WidgetsRedux';

export type WidgetShowOneProps = {

    widgetId: string;
};



export const WidgetShowOne = (props: WidgetShowOneProps) => {
    const { widgetId } = props;

    console.log("REDUX render", widgetId)

    const { getWidgetById } = useWidgets();
    const widget = getWidgetById(widgetId);
    return (
        <div style={{ border: "solid 1px black" }}>
            {widget.id}: {widget.value}
        </div>
    );
};


export const WidgetShowAll = () => {
    const { widgets } = useWidgets();

    return <div>
        <h3>All Widgets</h3>
        {widgets.map((v) => <p>{v.id}</p>)}
    </div>
}


export const WidgetCreator = () => {


    const { addWidget } = useWidgets();
    return <button onClick={() => {
        addWidget({
            id: `${Math.random()}`,
            value: Math.random()
        })
    }}>click to add widget</button>

}

export const MainRedux = () => {


    return <>
        <div style={{
            border: "solid 1px red"
        }}>
            <h2>Redux</h2>
            <Provider store={store} >
                <WidgetShowOne widgetId="one" />
                <WidgetShowOne widgetId="two" />
                <WidgetShowOne widgetId="three" />
                <WidgetCreator />

                <WidgetShowAll />
            </Provider>
        </div>
    </>
}