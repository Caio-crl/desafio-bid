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
	const [data, setData] = useState(['']);
	const [infos, setInfos] = useState({
		name: '',
		bid: '',
		create_date: '',
	});

	const call = (coin: string, previousData: any) => {
		axios
			.get(`https://economia.awesomeapi.com.br/last/${coin}`)
			.then(function (response) {
				setInfos(response.data[coin.replace('-', '')]);
				const k = [
					...previousData,
					response.data[coin.replace('-', '')],
				];
				setData(k);
				window.setTimeout(() => {
					call(coin, k);
				}, 30000);
			})
			
			.catch(function (error) {
				console.error(error);
			})
			.finally(function () {});
			
	};
	const handleChange = (event: any) => {
		setCoin(event.target.value);
		call(event.target.value, []);
	};

	return (
		<Box>
			<Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-around'} height={'200px'} sx={{backgroundColor:'#091d42'}}>
				<MenuIcon sx={{fontSize:'30px', color:'white'}} />
				<Typography fontSize={'70px'} color={'white'} alignSelf={'center'}> DataMoney </Typography>
				<ContactsIcon sx={{fontSize:'30px', color:'white'}} />
			</Box>
			<Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-around'} height={'500px'} sx={{backgroundColor:'white'}}>
				<Box display={'flex'} flexDirection={'column'} justifyContent={'center'} height={'100%'} sx={{backgroundColor:'#5ABF9A'}}>
					<Typography fontSize={'40px'} marginInline={'10px'}  textAlign={'center'}>Sobre</Typography>
					<Typography fontSize={'22px'} color={'#091d42'} textAlign={'center'} marginInline={'10px'}>
						A DataMoney veio para facilitar a consulta da cotação
						(bid), após a escolha da moeda o gráfico irá retornar
						atualizações a cada 30 segundos.
					</Typography>
				</Box>
				<Box width={'100%'} textAlign={'center'} sx={{backgroundColor:'white'}}>
					<Typography fontSize={'20px'} marginBottom={'10px'}>
						Escolha a moeda que deseja ver o câmbio:
					</Typography>
					{coin? 
					<FormControl sx={{ minWidth: 120 }}>
						<InputLabel>Moedas</InputLabel>
						<Select
							value={coin}
							label='Moedas'
							onChange={handleChange}
							disabled={true}
						>
							<MenuItem value='USD-BRL'>Dólar</MenuItem>
							<MenuItem value='EUR-BRL'>Euro</MenuItem>
							<MenuItem value='BTC-BRL'>Bitcoin</MenuItem>
						</Select>
					</FormControl> 
						:
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
					</FormControl>}
				</Box>
				<Box width={'100%'} sx={{backgroundColor:'white'}}>
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
