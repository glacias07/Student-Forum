import {  DATA_SET_FETCH, POST_CONTENT, POST_TITLE } from "./ActionTypes"


export const dataSetFetch = () =>{
    return{
        type: DATA_SET_FETCH,
        payload: dataset
    }
}

export const postTitleChange = text => {
    return{
        type: POST_TITLE,
        payload: text
    }
}

export const postContentChange = text => {
    return{
        type: POST_CONTENT,
        payload: text
    }
}