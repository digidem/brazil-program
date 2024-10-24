import React from 'react';
import { motion } from 'framer-motion';
import { Check, Wrench } from 'lucide-react';

const ProjectHighlight = ({ project }) => {
  return (
    <section className="mb-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-white text-center"
      >
        Project Highlight
      </motion.h2>
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8">
          <h3 className="text-3xl font-semibold mb-4 text-cyan-400">{project.title}</h3>
          <p className="text-xl mb-6 text-gray-300">{project.summary}</p>
          <h4 className="text-2xl font-semibold mb-4 text-white">Objectives:</h4>
          <ul className="space-y-4 mb-6">
            {project.objectives.map((objective, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start"
              >
                <Check className="text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-lg text-gray-300">{objective}</span>
              </motion.li>
            ))}
          </ul>
          <h4 className="text-2xl font-semibold mb-4 text-white">Tools Used:</h4>
          <div className="flex flex-wrap gap-4 mb-6">
            {project.tools_used.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center bg-gray-700 rounded-full px-4 py-2"
              >
                <Wrench className="text-cyan-400 mr-2" size={16} />
                <span className="text-sm text-gray-300">{tool}</span>
              </motion.div>
            ))}
          </div>
          <h4 className="text-2xl font-semibold mb-4 text-white">Results:</h4>
          <p className="text-lg text-gray-300">{project.results}</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectHighlight;