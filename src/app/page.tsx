'use client'; // This is a client component 👈🏽
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import './index.css';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from 'recharts';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
	const [coin, setCoin] = useState('');
	const [data, setData] = useState([]);

	const [infos, setInfos] = useState({
		name: '',
		bid: '',
		create_date: '',
	});

	const call = (coin: string, previousData: any) => {
		axios
			.get(`https://economia.awesomeapi.com.br/last/${coin}`)
			.then(function (response) {
				console.log('response', response.data[coin.replace('-', '')]);
				setInfos(response.data[coin.replace('-', '')]);
				const k = [
					...previousData,
					response.data[coin.replace('-', '')],
				];
				setData(k);
				window.setTimeout(() => {
					call(coin, k);
				}, 10000);
			})
			//feito isso pro value ficar igual à key de cada moeda da api,
			.catch(function (error) {
				console.error(error);
			})
			.finally(function () {});
	};
	const handleChange = (event: any) => {
		setCoin(event.target.value);
		call(event.target.value, []);
	};
	console.log(infos);
	console.log('DATA', data);

	return (
		<div className='container'>
			<FormControl
				sx={{ minWidth: 150, marginTop: 10, marginBottom: 20 }}
			>
				<InputLabel>Moedas</InputLabel>
				<Select value={coin} label='Moedas' onChange={handleChange}>
					<MenuItem value='USD-BRL'>Dolar</MenuItem>
					<MenuItem value='EUR-BRL'>Euro</MenuItem>
					<MenuItem value='BTC-BRL'>Bitcoin</MenuItem>
				</Select>
			</FormControl>

			<LineChart
				width={730}
				height={250}
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<Line type='monotone' dataKey='bid' stroke='#8884d8' />
				<CartesianGrid strokeDasharray='5 5' />
				<XAxis dataKey='create_date' />
				<YAxis />
				<Tooltip />
				<Legend />
			</LineChart>
		</div>
	);
};

export default Home;
