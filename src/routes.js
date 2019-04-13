import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Login from "./pages/Login";
import Confirmation from "./pages/Confirmation";
import ConfirmationStatus from "./pages/ConfirmationStatus";
import Modules from "./pages/Modules";

import Report from "./pages/Modules/Maintenance/Report";
import Receipt from "./pages/Modules/Maintenance/Receipt";
import Generate from "./pages/Modules/Maintenance/Receipt/Generate";

const Routes = (userLogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Login,
        Confirmation,
        ConfirmationStatus,
        Modules: createStackNavigator(
          {
            Modules,
            Maintenance: createBottomTabNavigator(
              {
                Report,
                Receipt
              },
              {
                tabBarOptions: {
                  showIcon: true,
                  showLabel: false,
                  activeTintColor: "#2287DE",
                  inactiveTintColor: "#C4C4C4",
                  style: {
                    borderTopColor: "#eaeaea",
                    borderTopWidth: 1
                  }
                }
              }
            )
          },
          {
            headerMode: "none"
          }
        )
      },
      {
        // initialRouteName: userLogged ? "Modules" : "Login"
        initialRouteName: "Modules"
      }
    )
  );

export default Routes;
