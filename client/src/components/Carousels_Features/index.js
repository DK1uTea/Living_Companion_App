import React from 'react';
import { Carousel } from 'react-bootstrap';
import TaskChart from '../TaskChart';
import HabitChart from '../HabitChart';
import ConsumptionChart from '../ConsumptionChart';

export default function Carousels_Feature() {
    return (
        <Carousel>
            <Carousel.Item interval={5000}>
                <TaskChart />           
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <HabitChart />         
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <ConsumptionChart />         
            </Carousel.Item>
        </Carousel>
    );
}
