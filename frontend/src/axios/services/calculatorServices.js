import { axiosCalcInstance } from "../axios";


export const saveCalc = async (data) => {
    const {response} = await axiosCalcInstance.post('/save', data)
    if(response){
        return response;
    }
}

export const allCalculations = async () => {
    const response = await axiosCalcInstance.get('/getAllCalculations')
    if(response.data){
        return response.data;
    }
}

export const deleteCalc = async (id) => {
    await axiosCalcInstance.post(`/delete/${id}`);
}