import { Axios } from "axios";


const fetcher = async (address) => {
    const { data } = await Axios.get(address);
    return data;
};

export default fetcher;