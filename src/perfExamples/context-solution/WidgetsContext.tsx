import React, { useState } from "react";


type Widget = {
    id: string;
    value: number;
}


type WidgetsContext = {
    widgets: Array<Widget>;
    getWidgetById: (id: string) => Widget;
    addWidget: (widget: Widget) => void;

}

const UsersContextContext = React.createContext<WidgetsContext>({

    widgets: [] as Array<Widget>,
    getWidgetById: () => { throw new Error("not implemented") },
    addWidget: () => { throw new Error("not implemented") },
})

export const WidgetsContextProvider = (props: React.PropsWithChildren<{
    initialWidgets: Array<Widget>
}>) => {

    const { children, initialWidgets } = props;


    const [widgets, setWidgets] = useState(initialWidgets.reduce((acc, cur) => {
        return {
            ...acc,
            [cur.id]: cur
        }
    }, {} as Record<string, Widget>));

    const widgetsArray = Object.values(widgets);

    const addWidget = (widget: Widget) => {
        setWidgets({
            ...widgets,
            [widget.id]: widget
        })
    }

    const getWidgetById = (id: string) => {
        const widget = widgets[id];
        if (!widget) {
            throw new Error("Widget not found");
        }

        return widget;
    }

    return <UsersContextContext.Provider value={{
        widgets: widgetsArray,
        addWidget,
        getWidgetById,
    }}>{children}</UsersContextContext.Provider>
}


export const useWidgetsContext = () => {
    return React.useContext(UsersContextContext);
}