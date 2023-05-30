import { useThree, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as TWEEN from "@tweenjs/tween.js"
import * as THREE from "three"

extend({ OrbitControls })

export default function Experience() {
    const { camera, gl } = useThree()

    camera.position.set(10, 10, 10)

    const sphereBlueRef = useRef()
    const sphereRedRef = useRef()
    const controlsRef = useRef()

    const animateCameraToTarget = (target) => {
        const currentPosition = camera.position.clone()

        new TWEEN.Tween(currentPosition)
            .to({ x: target.x + 5, y: target.y + 3, z: target.z + 5 }, 2000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                camera.position.copy(currentPosition)
            })
            .start()


        camera.lookAt(target)
        controlsRef.current.target.copy(target) // Update the controls target
    }

    useFrame(() => {
        TWEEN.update() // Update the tweening animation
        controlsRef.current.update() // Update the controls every frame

        console.log(camera.getWorldDirection(new THREE.Vector3()))
    })

    const handleSphere = (sphere) => {
        if (sphere.object.material.color.r) {
            animateCameraToTarget(sphereRedRef.current.position)
        } else {
            animateCameraToTarget(sphereBlueRef.current.position)
        }
    }

    return (
        <>
            <orbitControls ref={controlsRef} args={[camera, gl.domElement]} />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <mesh ref={sphereRedRef} position={[3, 0, -3]} onClick={handleSphere}>
                <sphereGeometry />
                <meshStandardMaterial color="red" />
            </mesh>
            <mesh ref={sphereBlueRef} position={[3, 0, 3]} onClick={handleSphere}>
                <sphereGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>

            <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="darkgreen" />
            </mesh>
        </>
    )
}