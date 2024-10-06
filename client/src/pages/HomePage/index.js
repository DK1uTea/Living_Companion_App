import React, { useEffect } from 'react';
import './HomePage.css';

export default function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      document.getElementById('banner').style.backgroundPosition = `50% ${-scrollPos / 4}px`;
      document.getElementById('bannertext').style.marginTop = `${scrollPos / 4}px`;
      document.getElementById('bannertext').style.opacity = 1 - scrollPos / 250;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      <div id="banner" className="home-page__banner">
        <div id="bannertext" className="home-page__banner-text">
          <h1 className="home-page__title">Living Companion App</h1>
          <p className="home-page__subtitle">Your Personal Assistant for Daily Wellness</p>
        </div>
      </div>

      <div id="content" className="home-page__content">
        <h2 className="home-page__about-title">About us</h2>
        <p className="home-page__about-text">The Living Companion App is a powerful tool designed to help you efficiently manage your daily life. With three main functions: Todo Tracking to organize your tasks, Habit Tracking to support the maintenance of positive habits, and Consumption Tracking to monitor your spending, this app is crafted to be your ideal companion on your journey of personal development.</p>
        <p className="home-page__about-text">We understand that modern life can be busy and stressful, which is why the Living Companion App provides valuable tools to easily track your progress and achieve your personal goals. Let us help you build a healthier and more balanced lifestyle!</p>
      </div>
    </div>
  );
}
