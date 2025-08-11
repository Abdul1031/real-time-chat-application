 import express, { Request, Response } from 'express';
 import { PrismaClient } from '@prisma/client';
 import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

    import dotenv from 'dotenv';

    dotenv.config();

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello from TypeScript Express Backend!');
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        // exclude password for security
      }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User created', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});
