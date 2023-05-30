import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        gl={ {
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputEncoding: THREE.sRGBEncoding
        } }
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 0, 4, 8 ]
        } }
    >
        <Experience />
    </Canvas>
)