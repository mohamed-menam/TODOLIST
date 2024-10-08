# TodoList

#Todo List Application

A simple, user-friendly Todo List application where users can register, log in, and manage their personal tasks. Each user sees only their own tasks.

Features
User Authentication: Register and log in with secure credentials.
Personalized Task Management: View, add, edit, and delete tasks that are specific to your account.
JWT Authentication: Ensures that each user can only manage their own tasks.
Responsive Design: Accessible on both mobile and desktop devices.

Technologies Used

> > Backend: Django (Python)
> > Frontend: Angular
> > Database: MySQL
> > Authentication: JWT-based authentication
> > Getting Started

Prerequisites

> Python 3.x
> Node.js and npm
> MySQL

Backend Setup (Django)
1-Clone the repository:
git clone https://github.com/yourusername/todo-list.git
cd todo-list/backend

2-Install Python dependencies:
pip install -r requirements.txt

3-Set up the MySQL database and configure the database settings in the settings.py file.

4-Run database migrations:

5-python manage.py migrate

6-Start the Django development server:
python manage.py runserver

Frontend Setup (Angular)
1-Navigate to the frontend folder:
cd todolist

2-Install Angular dependencies:
npm install
3-Start the Angular development server:
ng serve

Running the Application

1-Visit http://localhost:4200 for the frontend interface.

2- Use the application to register, log in, and manage your tasks.

