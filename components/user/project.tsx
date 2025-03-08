import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Updating the UI/UX of our company website.",
    image: "/react.png",
    tasks: 12,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Building a cross-platform mobile application.",
    image: "/react.png",
    tasks: 20,
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Executing a digital marketing strategy.",
    image: "/react.png",
    tasks: 8,
  },
  {
    id: 4,
    name: "Backend API Upgrade",
    description: "Improving the performance and security of the backend API.",
    image: "/react.png",
    tasks: 15,
  },
  {
    id: 5,
    name: "Database Migration",
    description: "Transitioning to a more scalable database system.",
    image: "/react.png",
    tasks: 10,
  },
];

const Project = () => {
  return (
    <Carousel className="w-full max-w-lg">
      <CarouselContent>
        {projects.map((project) => (
          <CarouselItem key={project.id} className="w-full h-[250px]">
            <div className="p-2 w-full h-full">
              <div className="relative w-full h-full group rounded-md overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition duration-300 group-hover:brightness-50"
                />

                <div className="absolute bottom-0 left-0 w-full bg-[#42526E] text-white text-center p-2 z-10">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition duration-300 p-4">
                  <p className="text-xs text-gray-300">{project.description}</p>
                  <p className="text-xs text-gray-300 mt-1">Tasks: {project.tasks}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Project;
