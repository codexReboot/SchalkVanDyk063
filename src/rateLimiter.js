import rateLimit from "express-rate-limit";

// Slow abuse protection (your current one)
const contactLimiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 3,
	standardHeaders: true,
	legacyHeaders: false,
	statusCode: 429,
	message: {
		error: "Too many messages. Please try again later.",
	},
});

// Burst protection (NEW)
const contactBurstLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 1, // only 1 request per minute
	standardHeaders: true,
	legacyHeaders: false,
	statusCode: 429,
	message: {
		error: "Please slow down and try again.",
	},
});

export const contactMiddlewares = [contactLimiter, contactBurstLimiter];
