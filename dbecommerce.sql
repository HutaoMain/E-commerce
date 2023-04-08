-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2023 at 04:21 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `created_date`, `description`, `image_url`, `updated_date`) VALUES
(1, 'Soap', '2023-04-05 17:58:35', 'whitening soaps', 'https://res.cloudinary.com/alialcantara/image/upload/v1680685094/upload/Images/SOAP/SNOW_WHITE_SOAP_GLUTA_COLLAGEN_PLUS.jpg', '2023-04-05 17:58:35'),
(2, 'Serum', '2023-04-05 18:00:50', 'Whitening Serum', 'https://res.cloudinary.com/alialcantara/image/upload/v1680685076/upload/Images/SERUM/SENSITIVE_ALOE_VERA_FACE_SERUM.jpg', '2023-04-05 18:00:50'),
(3, 'Glutathione', '2023-04-05 18:02:27', 'Glutathione for whitening', 'https://res.cloudinary.com/alialcantara/image/upload/v1680684907/upload/Images/GLUTATHIONE/GLUTA/Saluta_1200MG.jpg', '2023-04-05 18:02:27'),
(4, 'Face Mask', '2023-04-05 18:02:59', 'Whitening Face mask', 'https://res.cloudinary.com/alialcantara/image/upload/v1680685058/upload/Images/FACE%20MASK/SNAIL_WHITE_FACE_WASH.jpg', '2023-04-05 18:02:59');

-- --------------------------------------------------------

--
-- Table structure for table `confirmation_token`
--

CREATE TABLE `confirmation_token` (
  `id` bigint(20) NOT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `expires_at` datetime NOT NULL,
  `token` varchar(255) NOT NULL,
  `app_user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `date_now` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `order_json_list` longtext DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `proof_payment` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `user_full_name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `created_date`, `date_now`, `email`, `order_json_list`, `product_id`, `proof_payment`, `quantity`, `status`, `total_price`, `user_full_name`, `user_id`) VALUES
(4, '2023-04-08 02:13:16', '2023-04-08', 'admin@gmail.com', '[{\"id\":1,\"productName\":\"Snow white soap gluta collagen plus\",\"productDes\":\"Whitening Face mask\",\"productPrice\":20,\"imgUrl\":\"https://res.cloudinary.com/alialcantara/image/upload/v1680685094/upload/Images/SOAP/SNOW_WHITE_SOAP_GLUTA_COLLAGEN_PLUS.jpg\",\"quantity\":3,\"price\":20}]', NULL, NULL, NULL, 'Pending', 60, 'admin', 1),
(5, '2023-04-08 02:14:21', '2023-04-08', 'admin@gmail.com', '[{\"id\":2,\"productName\":\"Snail white whipp soap\",\"productDes\":\"Whitening Soap\",\"productPrice\":20,\"imgUrl\":\"https://res.cloudinary.com/alialcantara/image/upload/v1680685094/upload/Images/SOAP/SNAIL_WHITE_WHIPP_SOAP.jpg\",\"quantity\":1,\"price\":20}]', NULL, NULL, NULL, 'Pending', 20, 'admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `created_date`, `description`, `image_url`, `name`, `updated_date`, `category_id`, `price`, `quantity`) VALUES
(1, '2023-04-05 18:59:33', 'Whitening Face mask', 'https://res.cloudinary.com/alialcantara/image/upload/v1680685094/upload/Images/SOAP/SNOW_WHITE_SOAP_GLUTA_COLLAGEN_PLUS.jpg', 'Snow white soap gluta collagen plus', '2023-04-08 02:13:16', 1, 20, 0),
(2, '2023-04-05 19:00:38', 'Whitening Soap', 'https://res.cloudinary.com/alialcantara/image/upload/v1680685094/upload/Images/SOAP/SNAIL_WHITE_WHIPP_SOAP.jpg', 'Snail white whipp soap', '2023-04-08 02:14:21', 1, 20, 9),
(3, '2023-04-05 19:01:30', 'sensitive face serum', 'https://res.cloudinary.com/alialcantara/image/upload/v1680685076/upload/Images/SERUM/SENSITIVE_ALOE_VERA_FACE_SERUM.jpg', 'Sensitive aloe vera face serum', '2023-04-05 19:01:30', 2, 20, 10),
(4, '2023-04-05 19:02:01', 'Retinol serum', 'https://res.cloudinary.com/alialcantara/image/upload/v1680685075/upload/Images/SERUM/VIBRANT_GLAMOUR_RETINOL_SERUM.jpg', 'Vibrant glamour retinol serum', '2023-04-05 19:02:01', 2, 20, 10),
(5, '2023-04-05 19:02:49', 'Gluta tablet', 'https://res.cloudinary.com/alialcantara/image/upload/v1680684960/upload/Images/GLUTATHIONE/ORAL%20WHITENING%20SLIMMING/CARTINEX_TABLET.jpg', 'Cartinex tablet', '2023-04-05 19:02:49', 3, 20, 10),
(6, '2023-04-05 19:03:08', 'Gluta tablet', 'https://res.cloudinary.com/alialcantara/image/upload/v1680684960/upload/Images/GLUTATHIONE/ORAL%20WHITENING%20SLIMMING/glutanez_tablet.jpg', 'Glutanez tablet', '2023-04-05 19:03:08', 3, 20, 10),
(7, '2023-04-05 19:03:33', 'Gluta tablet', 'https://res.cloudinary.com/alialcantara/image/upload/v1680685058/upload/Images/FACE%20MASK/KOREAN_FACE_MASK.webp', 'Korean face mask', '2023-04-05 19:03:33', 4, 20, 10),
(8, '2023-04-05 19:03:50', 'Gluta tablet', 'https://res.cloudinary.com/alialcantara/image/upload/v1680685058/upload/Images/FACE%20MASK/ALOE_VERA_FACE_MASK.jpg', 'Aloe vera face mask', '2023-04-05 19:03:50', 4, 20, 10);

-- --------------------------------------------------------

--
-- Table structure for table `product_rating`
--

CREATE TABLE `product_rating` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `rating` float NOT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image_url` varchar(300) DEFAULT NULL,
  `is_enabled` bit(1) DEFAULT NULL,
  `is_locked` bit(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `image_url`, `is_enabled`, `is_locked`, `password`, `user_role`, `username`) VALUES
(1, 'admin@gmail.com', 'admin', 'http://cdn.onlinewebfonts.com/svg/img_325798.png', b'1', b'0', '$2a$10$prHe0PthHWIKkeqoQcBDve3uE4nUDsEWSnMYPJ6TlaQeb76kS4NRS', 'ROLE_USER', 'admin@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbcnap2kh2odaogu0jwb6yhubt` (`app_user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`);

--
-- Indexes for table `product_rating`
--
ALTER TABLE `product_rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt3mecsgki7hdg8srke4baeidk` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product_rating`
--
ALTER TABLE `product_rating`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  ADD CONSTRAINT `FKbcnap2kh2odaogu0jwb6yhubt` FOREIGN KEY (`app_user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `product_rating`
--
ALTER TABLE `product_rating`
  ADD CONSTRAINT `FKt3mecsgki7hdg8srke4baeidk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
