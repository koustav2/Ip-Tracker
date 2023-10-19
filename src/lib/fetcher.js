
const fetcher = async (address) => {
    const response = await fetch(address);
    const data = await response.json();
    return data;
};

export default fetcher;