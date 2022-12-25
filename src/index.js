import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from '../images/icon-location.svg'
import {validateIp, addTileLayer, getAddress, addOffset} from './helpers'
import 'babel-polyfill'

const ipInput = document.querySelector('.search-bar__input')
const button = document.querySelector('.search-bar__btn')
const ipInfo = document.getElementById('ip')
const locationInfo = document.getElementById('location')
const timezone = document.getElementById('timezone')
const ispInfo = document.getElementById('isp')

button.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

const mapArea = document.getElementById('map')
const markerIcon = L.icon({
	iconUrl: icon,
	iconSize: [30, 40]
})

const map = L.map(mapArea, {
	center: [51.505, -0.09],
	zoom: 13,
	icon: markerIcon,
	zoomControl: false
})

addTileLayer(map)

L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map)

function getData() {
	if (validateIp(ipInput.value)) {
		getAddress(ipInput.value).then(setInfo)
	}
}

function handleKey(e) {
	if (e.code === 'Enter') {
		getData()
	}
}

function setInfo(mapData) {
	const {lat, lng, country, region} = mapData.location
	
	ipInfo.innerText = mapData.ip
	locationInfo.innerText = `${country} ${region}`
	timezone.innerText = mapData.location.timezone
	ispInfo.innerText = mapData.isp
	
	map.setView([lat, lng])
	L.marker([lat, lng], {icon: markerIcon}).addTo(map)
	
	if (window.matchMedia("(max-width: 1023px)").matches) {
		addOffset(map)
	}
}

document.addEventListener('DOMContentLoaded', ()=>{
	getAddress('5.251.181.116').then(setInfo)
})
