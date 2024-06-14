import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom"; 

interface Post {
  _id: string;
  images: string[];
  videos: string[];
  captions: string;
}

interface PostsDisplayCommonProps {
  post: Post;
}

const PostsDisplayCommon: React.FC<PostsDisplayCommonProps> = ({ post }) => {
  
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: () => (
      <div className="w-5 h-0.5 rounded-lg mt-2 bg-gray-500 dark:bg-gray-500"></div>
    ),
    dotsClass: "slick-dots slick-thumb flex justify-center",
  };
  const navigate = useNavigate();

  return (
    <div className="p-6" onDoubleClick={() => navigate(`/post/${post._id}`)}>
    <div >
    {post.images.length > 0 && post.videos.length > 0 ? (
        <Slider {...settings}>
          {post.images.map((image: string, index: number) => (
            <div key={index}  >
              <a href={image}>
              <img
                src={image}
                alt={`Post image ${index}`}
                className="w-full h-auto"
              />
              </a>
            </div>
          ))}
          {post.videos.map((video: string, index: number) => (
            <div key={index} >
              <video
                src={video}
                controls
                autoPlay
                muted 
                className="w-full h-auto items-center align-middle"
              />
            </div>
          ))}
        </Slider>
      ) : post.images.length > 0 ? (
        post.images.length === 1 ? (
          <a href={post.images[0]}>
            <img
            src={post.images[0]}
            alt={`Post image`}
            className="w-full h-auto"
          />
          </a>
        ) : (
          <Slider {...settings}>
            {post.images.map((image: string, index: number) => (
              <div key={index}>
                <a href={image}>
                <img
                  src={image}
                  alt={`Post image ${index}`}
                  className="w-full h-auto"
                />
                </a>
              </div>
            ))}
          </Slider>
        )
      ) : post.videos.length > 0 ? (
        post.videos.length === 1 ? (
          <video
            src={post.videos[0]}
            controls
            autoPlay
            muted
            className="w-full h-auto items-center align-middle"
          />
        ) : (
          <Slider {...settings}>
            {post.videos.map((video: string, index: number) => (
              <div key={index}>
                <video
                  src={video}
                  controls
                  autoPlay
                  muted
                  className="w-full h-auto items-center align-middle"
                />
              </div>
            ))}
          </Slider>
        )
      ) : (
        <p></p>
      )}
    </div>
      <p className="mt-4 ">{post.captions}</p>
    </div>
  );
};

export default PostsDisplayCommon;
