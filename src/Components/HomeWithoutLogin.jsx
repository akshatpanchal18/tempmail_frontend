import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function HomeWithoutLogin() {
  const blogs = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt:
        "Explore the trends and technologies shaping the future of web development.",
    },
    {
      id: 2,
      title: "Why React is the Best Frontend Framework",
      excerpt:
        "A deep dive into why React is so popular for building modern web apps.",
    },
    {
      id: 3,
      title: "Understanding CSS Grid",
      excerpt:
        "Learn the basics and advanced techniques of CSS Grid for responsive layouts.",
    },
    {
      id: 4,
      title: "Understanding Core concepts of ReactJS",
      excerpt:
        "Learn the basics and advanced techniques of ReactJS for interactive user interface and onepage Application.",
    },
  ];
  return (
    <div>
      <Wrapper>
        <section className="hero-section">
          <div className="hero-content">
            <img src="src\assets\logo.png" alt="" />
            <h1>Welcome to @temp.com</h1>
            <p>
              This is a platform where we provide disposable email address to
              reduce the storage of you mail-box and Forget about spam,
              advertising mailings, hacking and attacking robots. Keep your real
              mailbox clean and secure. Temp Mail provides temporary, secure,
              anonymous, free, disposable email address.
            </p>
            
            <NavLink to='/login'>
            <button className="get-btn">Get Started</button>
            </NavLink>
          </div>
          <img
            // src="https://via.placeholder.com/800x400"
            src="/email.avif"
            alt="Website introduction"
          />
        </section>

        <section className="blog-section">
          <h2>Latest Blogs</h2>
          <div className="blog-list">
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <button className="read-more">Read More</button>
              </div>
            ))}
          </div>
        </section>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
  /* Hero Section Styling */
.hero-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 20px;
  background-color: #f8f8f8;
  border-radius: 20px;
  max-width: 1400px;
  margin: 1.5rem auto;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.4);
}

.get-btn {
  border: none;
  outline: none;
  padding: 1rem 0.5rem;
  margin-top: 1rem;
  border-radius: 5px;
  font-size: 1.5rem;
  color: white;
  background: #007bff;
}

.get-btn:hover {
  background: #01468f;
  transform: scale(0.9);
  transition: 0.2s ease-in;
}

.hero-content {
  max-width: 50%;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 1.2rem;
  color: #333;
}

.hero-section img {
  max-width: 45%;
  border-radius:10px;
}

/* Blog Section Styling */
.blog-section {
  padding: 50px 20px;
  background-color: #fff;
  text-align: center;
  max-width: 1400px;
  margin: 0 auto;
}

.blog-section h2 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.blog-card {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.4);
}

.blog-card h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.blog-card p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
}

.read-more {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Mobile View Styling */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    align-items: center;
    padding: 30px 10px; /* Reduced padding for smaller screens */
  }

  .hero-content {
    max-width: 100%; /* Full width on small screens */
    text-align: center;
  }

  .hero-content h1 {
    font-size: 2rem; /* Slightly smaller heading */
  }

  .hero-content p {
    font-size: 1rem; /* Adjusted text size */
  }

  .hero-section img {
    max-width: 80%; /* Reduced image size */
    margin-top: 20px;
  }

  .get-btn {
    width: 50%; /* Full width button */
    font-size: 1.3rem; /* Slightly smaller font size */
    padding: 1rem; /* Adjust padding */
  }

  .blog-section h2 {
    font-size: 1.5rem; /* Adjusted heading font size */
  }

  .blog-list {
    grid-template-columns: 1fr; /* Single column layout for blogs */
    padding: 0 20px;
  }

  .blog-card {
    padding: 15px;
  }

  .blog-card h3 {
    font-size: 1.3rem; /* Adjusted font size for small screens */
  }

  .blog-card p {
    font-size: 0.9rem; /* Adjusted text size */
  }

  .read-more {
    font-size: 1rem;
    padding: 8px 15px; /* Adjusted padding */
  }
}

`;
export default HomeWithoutLogin;
