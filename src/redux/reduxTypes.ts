export interface Action {
    (payload: []): {
        type: string;
        payload: [];
    }
}

export interface Action2 {
    (payload: {}): {
        type: string;
        payload: {};
    }
}

export interface ActionArray {
    type: string;
    payload: [];
}

export interface ActionObject {
    type: string;
    payload: {};
}

export type ActionOptions = ActionArray | ActionObject