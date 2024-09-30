import React from 'react'
import { Carousel } from 'react-bootstrap'
import TaskChart from '../TaskChart'
export default function Carousels_Feature() {
    return (
        <Carousel>
            <Carousel.Item interval={3000} style={{padding: '10px'}}>
                {/* <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1721332155567-55d1b12aa271?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="First slide"
                    style={{width: "100vw", height: "100vh"}}
                />                 */}
                <TaskChart />
                {/* <Carousel.Caption style={{color: 'black'}}>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>            */}
            </Carousel.Item>
            <Carousel.Item interval={3000} style={{padding: '10px'}}>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1721332155567-55d1b12aa271?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Second slide"
                    style={{width: "100vw", height: "100vh"}}
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000} style={{padding: '10px'}}>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1721332155567-55d1b12aa271?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Third slide"
                    style={{width: "100vw", height: "100vh"}}
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}
