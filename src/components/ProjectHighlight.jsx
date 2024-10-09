import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ProjectHighlight = ({ project }) => {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-white">Project Highlight</h2>
      <Card className="hover-lift bg-gradient-to-br from-gray-800 to-gray-900 border-none">
        <CardContent className="p-8">
          <h3 className="text-3xl font-semibold mb-4 text-cyan-400">{project.title}</h3>
          <p className="text-xl mb-6 text-gray-300">{project.summary}</p>
          <h4 className="text-2xl font-semibold mb-4 text-white">Objectives:</h4>
          <ul className="list-disc list-inside mb-6 text-gray-300">
            {project.objectives.map((objective, index) => (
              <li key={index} className="text-lg mb-2">{objective}</li>
            ))}
          </ul>
          <h4 className="text-2xl font-semibold mb-4 text-white">Tools Used:</h4>
          <p className="text-lg mb-6 text-gray-300">{project.tools_used.join(', ')}</p>
          <h4 className="text-2xl font-semibold mb-4 text-white">Results:</h4>
          <p className="text-lg text-gray-300">{project.results}</p>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProjectHighlight;