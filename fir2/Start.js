import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Home from './pages/Home';
import Email from './pages/Email';
import Profile from './pages/Profile';

let AppNavigator = createSwitchNavigator(
	{
		Home: { screen: Home },
		Email: { screen: Email },
		Profile: { screen: Profile }
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none'
	}
);

export default createAppContainer(AppNavigator);