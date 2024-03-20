'use client'; // This is a client component 👈🏽
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import './index.css';
import {
	BottomNavigation,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	AreaChart,
	Area,
} from 'recharts';
import MenuIcon from '@mui/icons-material/Menu';
import ContactsIcon from '@mui/icons-material/Contacts';

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
				}, 3000);
			})
			//feito isso pro value ficar igual à key da api de cada moeda da api,
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
	// if () {

	// }
	return (
		<Box className='container'>
			<Box className='header'>
				<MenuIcon className='icon' />
				<Typography className='title'> DataMoney </Typography>
				<ContactsIcon className='icon' />
			</Box>
			<Box className='body'>
				<Box className='section'>
					<Typography className='sobre'>Sobre</Typography>
					<Typography className='text'>
						A DataMoney veio para facilitar a consulta da cotação
						(bid), após a escolha da moeda o gráfico irá retornar
						atualizações a cada 30 segundos.
					</Typography>
				</Box>
				<Box className='section1'>
					<Typography className='subtitle'>
						Escolha a moeda que deseja ver o câmbio:
					</Typography>
					<FormControl sx={{ minWidth: 120 }}>
						<InputLabel>Moedas</InputLabel>
						<Select
							value={coin}
							label='Moedas'
							onChange={handleChange}
						>
							<MenuItem value='USD-BRL'>Dólar</MenuItem>
							<MenuItem value='EUR-BRL'>Euro</MenuItem>
							<MenuItem value='BTC-BRL'>Bitcoin</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box className='section2'>
					<AreaChart width={500} height={450} data={data}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='create_date' />
						<YAxis />
						<Tooltip />
						<Area
							type='monotone'
							dataKey='bid'
							stroke='#8c6dd6'
							fill='#8c6dd6'
						/>
						<Legend />
					</AreaChart>
				</Box>
			</Box>
			<BottomNavigation className='footer'></BottomNavigation>
		</Box>
	);
};

export default Home;
