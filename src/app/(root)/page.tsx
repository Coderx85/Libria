"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { animations, features, stats, steps, testimonials, categories, readingGoals } from '@/constant/home';
import { HomeIcon } from '@/constant/home';
import { Testimonial, ReadingGoal, ReadingStats, Category } from '.';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { BookCover } from "@/components/books";
import { sampleBooks } from "@/constant";
import Image from "next/image"

const Page = () => {
  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <motion.section 
        initial="initial"
        animate="animate"
        variants={animations.staggerChildren}
        className='container mx-auto min-h-screen flex flex-col items-center justify-center text-center px-4'
      >
        <motion.h1 
          variants={animations.fadeInUp}
          className='text-9xl font-extrabold font-bebas-neue bg-clip-text text-transparent bg-gradient-to-b from-light-500 via-light-300 to-light-100'
        >
          Welcome to Libria
        </motion.h1>
        <motion.div 
          variants={animations.fadeInUp}
          className='flex flex-col gap-5 mt-20'
        >
          <p className='text-light-200 text-4xl font-bold'>Your one-stop solution for all your book needs.</p>
          <p className='text-light-200 text-2xl font-semibold'>Explore our collection, borrow books, and enjoy reading!</p>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={animations.staggerChildren}
        className='container mx-auto min-h-screen flex flex-col justify-center py-20 px-4'
      >
        <motion.h2 
          variants={animations.fadeInUp}
          className='text-5xl font-bold text-light-200 text-center mb-16'
        >
          Why Choose Libria?
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto'>
          {features.map((feature: HomeIcon, index) => (
            <motion.div
              key={index}
              variants={animations.fadeInUp}
              className='gradient-vertical p-8 rounded-xl text-center'
            >
              <div className='flex justify-center text-primary mb-4'>
                <feature.icon className="text-4xl" />
              </div>
              <h3 className='text-2xl font-semibold text-light-200 mb-3'>{feature.title}</h3>
              <p className='text-light-100'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={animations.staggerChildren}
        className='container mx-auto min-h-screen flex flex-col justify-center py-20 px-4 gradient-blue'
      >
        <motion.h2 
          variants={animations.fadeInUp}
          className='text-5xl font-bold text-light-200 text-center mb-16'
        >
          Our Impact in Numbers
        </motion.h2>
        <div className='flex flex-col md:flex-row justify-around items-center gap-10 max-w-7xl mx-auto'>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={animations.fadeInUp}
              className='text-center flex flex-col items-center gap-4'
            >
              <div className='text-primary mb-2'>
                <stat.icon className="text-5xl" />
              </div>
              <h4 className='text-5xl font-bold text-primary'>{stat.number}</h4>
              <p className='text-light-200 text-xl'>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={animations.staggerChildren}
        className='container mx-auto min-h-screen flex flex-col justify-center py-20 px-4'
      >
        <motion.h2 
          variants={animations.fadeInUp}
          className='text-5xl font-bold text-light-200 text-center mb-16'
        >
          How It Works
        </motion.h2>
        <div className='flex flex-col gap-16 max-w-6xl mx-auto'>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={animations.slideIn}
              className='flex flex-col md:flex-row items-center gap-8 gradient-vertical p-8 rounded-xl'
            >
              <div className='text-primary p-6 bg-dark-300 rounded-full'>
                <step.icon className="text-4xl" />
              </div>
              <div>
                <h3 className='text-2xl font-semibold text-light-200 mb-2'>{step.title}</h3>
                <p className='text-light-100 text-lg'>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={animations.staggerChildren}
        className='container mx-auto min-h-screen flex flex-col justify-center py-20 px-4 gradient-vertical'
      >
        <motion.h2 
          variants={animations.fadeInUp}
          className='text-5xl font-bold text-light-200 text-center mb-16'
        >
          What Our Readers Say
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {testimonials.map((testimonial: Testimonial, index) => (
            <motion.div
              key={index}
              variants={animations.fadeInUp}
              className='gradient-blue p-8 rounded-xl'
            >
              <p className='text-light-100 text-lg italic mb-6'>{testimonial.quote}</p>
              <div>
                <p className='text-primary font-semibold'>{testimonial.author}</p>
                <p className='text-light-200 text-sm'>{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Popular Categories Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={animations.staggerChildren}
        className='container mx-auto min-h-screen flex flex-col justify-center py-20 px-4'
      >
        <motion.h2 
          variants={animations.fadeInUp}
          className='text-5xl font-bold text-light-200 text-center mb-16'
        >
          Popular Categories
        </motion.h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
          {categories.map((category: Category, index) => (
            <motion.div
              key={index}
              variants={animations.fadeInUp}
              className='gradient-vertical p-6 rounded-xl text-center cursor-pointer hover:scale-105 transition-transform'
            >
              <h3 className='text-xl font-semibold text-light-200 mb-2'>{category.name}</h3>
              <p className='text-primary'>{category.count} Books</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Reading Goals Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={animations.staggerChildren}
        className='container mx-auto min-h-screen flex flex-col justify-center py-20 px-4 gradient-blue'
      >
        <motion.h2 
          variants={animations.fadeInUp}
          className='text-5xl font-bold text-light-200 text-center mb-16'
        >
          Set Your Reading Goals
        </motion.h2>
        <div className='flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto items-center'>
          <motion.div 
            variants={animations.slideIn}
            className='flex-1 space-y-8'
          >
            <div className='space-y-4'>
              <h3 className='text-3xl font-semibold text-light-200'>Track Your Progress</h3>
              <p className='text-light-100 text-lg'>Set personal reading goals, track your progress, and earn achievements as you read more books.</p>
            </div>
            <div className='space-y-6'>
              {readingGoals.goals.map((item: ReadingGoal, index) => (
                <div key={index} className='space-y-2'>
                  <div className='flex justify-between text-light-200'>
                    <span>{item.goal}</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className='h-2 bg-dark-300 rounded-full'>
                    <div 
                      className='h-full bg-primary rounded-full transition-all duration-500'
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            variants={animations.fadeInUp}
            className='flex-1 grid grid-cols-2 gap-6'
          >
            {readingGoals.stats.map((stat: ReadingStats, index) => (
              <div key={index} className='gradient-vertical p-6 rounded-xl text-center'>
                <h4 className='text-light-200 mb-2'>{stat.title}</h4>
                <p className='text-2xl font-bold text-primary'>{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Books Carousel */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={animations.staggerChildren}
        className='container mx-auto min-h-screen flex flex-col justify-center py-20 px-4'
      >
        <motion.h2 
          variants={animations.fadeInUp}
          className='text-5xl font-bold text-light-200 text-center mb-16'
        >
          Featured Books
        </motion.h2>
        <motion.div
          variants={animations.fadeInUp}
          className="w-full max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {sampleBooks.map((book, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="gradient-vertical border-none">
                    <CardContent className="flex flex-col items-center p-6">
                      <div className="w-48 h-64 relative mb-4">
                        <BookCover 
                          coverColor={book.coverColor} 
                          coverImage={book.coverUrl}
                          variant="medium"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-light-200 text-center line-clamp-1 mb-2">
                        {book.title}
                      </h3>
                      <p className="text-light-100 text-sm italic text-center">
                        {book.genre}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Image 
                          src="/star.svg"
                          alt="rating" 
                          width={16} 
                          height={16} 
                        />
                        <span className="text-primary">{book.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-dark-300 border-none text-light-100 hover:bg-dark-600 hover:text-primary" />
            <CarouselNext className="bg-dark-300 border-none text-light-100 hover:bg-dark-600 hover:text-primary" />
          </Carousel>
        </motion.div>
      </motion.section>www
    </div>
  );
};

export default Page;