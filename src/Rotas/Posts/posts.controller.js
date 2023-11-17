import { Router } from "express";

import PostsService from "./posts.service.js";

import jwtGuard from "../../auth/guards/jwt.guard.js";

const router = Router();

const postsService = new PostsService();

