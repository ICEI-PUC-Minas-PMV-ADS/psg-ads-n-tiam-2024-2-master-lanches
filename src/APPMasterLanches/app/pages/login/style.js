	import { Dimensions, StyleSheet } from 'react-native';

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#000000',
		},
		boxTop: {
			flex: 1,
			justifyContent: 'center',
		},
		// imageLogo: {
		// 	width: 250,
		// 	height: 300
		// },
		title: {
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '80%',
			marginBottom: 40,
		},

		titleTextLeft: {
			color: '#FFFFFF',
			fontSize: 16,
			fontWeight: '500',
		},
		titleTextRight: {
			color: '#FFFFFF',
			fontSize: 16,
		},
		boxBottom: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			width: '80%',
			paddingBottom: 50
		},

		button: {
			backgroundColor: '#fbdb5b',
			textAlign: 'center',
			width: '90%',
			height: 45,
			marginTop: 15,
			borderRadius: 15,
			justifyContent: 'center',
			alignItems: 'center'
		},
		buttonText: {
			color: 'black',
			fontWeight: 'bold',
		},
		btnCriarConta: {
			marginTop: 15,
		},
	
		textBtnCadastro: {
		color: '#FFF'
		} 
	});

	export default styles;