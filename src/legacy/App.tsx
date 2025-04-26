import './App.scss';
import './styles/variables.scss'
import Layout from "./layout/MainLayout/Layout";
import {FC} from "react";
import { AppRouter } from './AppRouter/app-router';

const App:FC = () => <AppRouter/>

export default App