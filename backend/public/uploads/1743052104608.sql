-- phpMyAdmin SQL Dump
-- version 2.10.1
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: Jul 05, 2024 at 12:31 PM
-- Server version: 5.0.37
-- PHP Version: 5.2.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Database: `restaurant`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `signup`
-- 

CREATE TABLE `signup` (
  `id` int(20) NOT NULL auto_increment,
  `email` varchar(50) collate armscii8_bin NOT NULL,
  `username` varchar(50) collate armscii8_bin NOT NULL,
  `password` varchar(50) collate armscii8_bin NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin AUTO_INCREMENT=7 ;

-- 
-- Dumping data for table `signup`
-- 

INSERT INTO `signup` (`id`, `email`, `username`, `password`) VALUES 
(5, 0x7373616e6b617669303740676d61696c2e636f6d, 0x73616e6b617669, 0x73616e6b75),
(6, 0x7373616e6b617669303740676d61696c2e636f6d, 0x72616d7332383039, 0x72616d736464);
