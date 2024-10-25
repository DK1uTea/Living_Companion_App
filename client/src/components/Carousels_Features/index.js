import React from 'react';
import { Carousel } from 'react-bootstrap';
import TaskChart from '../TaskChart';

export default function Carousels_Feature() {
    return (
        <Carousel>
            <Carousel.Item interval={5000}>
                <TaskChart />           
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <TaskChart />           
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <TaskChart />           
            </Carousel.Item>
        </Carousel>
    );
}
