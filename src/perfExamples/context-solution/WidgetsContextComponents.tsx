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
import { store } from './WidgetsRedux';

export type WidgetShowOneProps = {

    widgetId: string;
};



export const WidgetShowOne = (props: WidgetShowOneProps) => {
    const { widgetId } = props;


    const { getWidgetById } = useWidgetsContext();



    console.log("CONTEXT render", widgetId)
    const widget = getWidgetById(widgetId);
    return (
        <div style={{ border: "solid 1px black" }}>
            {widget.id}: {widget.value}
        </div>
    );
};


export const WidgetShowAll = () => {
    const { widgets } = useWidgetsContext();

    return <div>

        <h3>All Widgets</h3>
        {widgets.map((v) => <p>{v.id}</p>)}

    </div>
}


export const WidgetCreator = () => {


    const { addWidget } = useWidgetsContext();
    return <button onClick={() => {
        addWidget({
            id: `${Math.random()}`,
            value: Math.random()
        })
    }}>click to add widget</button>

}

export const MainContext = () => {


    return <>
        <div style={{
            border: "solid 1px red"
        }}>
            <h2>Context</h2>

            <WidgetsContextProvider initialWidgets={[
                {
                    id: "one",
                    value: 1,
                },
                {
                    id: "two",
                    value: 1,
                }
                , {
                    id: "three",
                    value: 1,
                }


            ]}>
                <WidgetShowOne widgetId="one" />
                <WidgetShowOne widgetId="two" />
                <WidgetShowOne widgetId="three" />
                <WidgetCreator />

                <WidgetShowAll />

            </WidgetsContextProvider>
        </div>
    </>
}


