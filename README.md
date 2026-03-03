# LAB4 – Gamified Missions Web Laboratory

This project was developed for the course **Tecnologías y Sistemas Web** and corresponds to **Laboratory 4**.

The objective of this laboratory was to build a small gamified web application using **HTML, CSS, and JavaScript**, integrating dynamic behavior, DOM manipulation, and a progression system based on XP.

The project runs entirely on a **local Nginx server** inside a WSL (Ubuntu) environment.

---

## Project Description

This application allows users to:

- Create missions with a name, description, and difficulty
- Complete missions to gain XP
- Delete missions without gaining XP
- Progress through different character classes based on accumulated XP
- See a visual XP progress bar that updates dynamically
- Automatically change the character avatar and class name when leveling up

The application introduces a basic gamification system to simulate task progression and reward completion.

---

## Character Progression System

The application includes three progression levels:

| Level | Class        | XP Range     |
|-------|-------------|--------------|
| 1     | Novato      | 0 – 49 XP    |
| 2     | Aventurero  | 50 – 149 XP  |
| 3     | Mago        | 150+ XP      |

Each level includes:

- A different avatar image
- A different XP bar color
- A class name displayed under the avatar

### XP Rewards by Difficulty

| Difficulty | XP Gained |
|------------|-----------|
| Fácil      | 10 XP     |
| Normal     | 25 XP     |
| Difícil    | 50 XP     |

When a mission is completed:
- XP is added
- The mission is removed

When a mission is deleted:
- No XP is granted
- The mission is removed

---

## Visual Features Implemented

The following UI/UX features were implemented:

- Fully centered layout
- Minimalist stitched-style borders using dashed CSS borders
- Responsive layout using Flexbox and Grid
- Scroll limited only to the missions container
- Dynamic XP progress bar
- Color-coded progress bar per level:
  - Green → Novato
  - Blue → Aventurero
  - Purple → Mago
- Automatic avatar switching based on class
- DOM manipulation without page reload
- Enter key support to create missions

---

## How to Run Locally

To view the project using Nginx, follow these steps:

1. Create the project directory inside the Nginx web root:
   sudo mkdir -p /var/www/html/lab4
   
2. Copy all HTML files to the root of the project directory:
  sudo cp ./* /var/www/html/lab4/
  The index.html file must be located at this level.

3. Set proper permissions to ensure Nginx can access the files:
  sudo chown -R www-data:www-data /var/www/html/lab4
  sudo chmod -R 755 /var/www/html/lab4

4. Open the project in a web browser:
  [http://localhost/lab4/index.html](http://localhost/lab4)

## Technologies Used

- HTML  
- CSS
- JavaScript  
- Nginx web server  
- WSL (Linux environment on Windows)



## Author

- Student: Miguel Rosas – 241274  
- Course: Tecnologías y Sistemas Web  
- Year: 2026  



## Video

Video demonstration:  
[https://youtu.be/fcGmskBjj-w](https://youtu.be/fcGmskBjj-w)
