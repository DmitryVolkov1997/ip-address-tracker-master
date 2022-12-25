import axios from 'axios'

export async function getAddress(ip = '8.8.8.8') {
	const {data} = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_SgzDxqgwjV4prlLCFUEUu4NNWuTfW&ipAddress=${ip}`)
	
	return await data
}