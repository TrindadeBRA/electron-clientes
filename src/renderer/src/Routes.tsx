import { Router, Route } from 'electron-router-dom'

import Home from './pages/home'
import Create from './pages/create'
import About from './pages/about'
import Detail from './pages/detail'
import Layout from './components/layout'

export default function Routes() {
    return (
        <Router
            main={
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/detail" element={<Detail />} />
                </Route>
            }
        />
    )
}