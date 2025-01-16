import { useEffect, useRef, useState } from "react";

export const captchaGenerate = () => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState("");
  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const textLength = 6;
    const captcha = Array.from({ length: textLength }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join("");

    setCaptchaText(captcha);
    drawCaptcha(captcha);
  };

  console.log(captchaText);

  useEffect(() => {
    const interval = setInterval(() => generateCaptcha(), 20000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current; // Assume you have a React `ref` for the canvas
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to 200x100
    canvas.width = 200;
    canvas.height = 70;

    // Random gradient background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    gradient.addColorStop(
      0,
      `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
    );
    gradient.addColorStop(
      1,
      `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
    );
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random noise (dots)
    for (let i = 0; i < 500; i++) {
      // Adjusted for smaller canvas
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.5})`;
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2,
      );
    }

    // Draw random curves (lines for distortion)
    for (let i = 0; i < 3; i++) {
      // Fewer curves for smaller canvas
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      for (let j = 0; j < 2; j++) {
        // Adjusted for simplicity
        ctx.quadraticCurveTo(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * canvas.width,
          Math.random() * canvas.height,
        );
      }
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
      ctx.lineWidth = Math.random() * 1.5;
      ctx.stroke();
    }

    // Draw CAPTCHA text
    ctx.font = "30px Arial"; // Adjusted font size for smaller canvas
    ctx.textBaseline = "middle";
    for (let i = 0; i < text.length; i++) {
      const x = 20 + i * 25; // Adjusted horizontal spacing
      const y = 25 + Math.random() * 20 - 10; // Adjusted vertical positioning
      const angle = Math.random() * 0.6 - 0.3; // Random rotation between -0.3 and 0.3 radians
      const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Add blur effect for security
    ctx.filter = "blur(1px)";

    return text;

  };

  console.log({ drawCaptcha });

  return {
    canvasRef,
    captchaText,
    generateCaptcha,
  };
};
