import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategoryById, getProjectsByCategory, categories } from '../assets/projectsData';

const ProjectCard = ({ project, index }) => {
  const isWide = index === 3; // Make 4th card a wide card
  const glowClass = index % 2 === 0
    ? 'hover:shadow-[0_20px_50px_-20px_rgba(0,245,245,0.3)]'
    : 'hover:shadow-[0_20px_50px_-20px_rgba(255,81,250,0.2)]';

  if (isWide) {
    return (
      <Link
        to={project.link}
        className={`group relative lg:col-span-2 bg-surface-container-highest/40 glass-panel rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 no-underline text-inherit`}
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 bg-gradient-to-br from-surface-container-high to-surface-container-lowest p-10 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-8xl text-cyan-400/30 group-hover:text-cyan-400/50 transition-colors"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {project.icon}
            </span>
          </div>
          <div className="p-10 md:w-1/2 flex flex-col justify-center">
            <div className="mb-4">
              <span className={`text-[10px] font-label uppercase tracking-widest px-2 py-1 rounded ${
                project.tagColor === 'primary'
                  ? 'text-primary-fixed bg-primary/10'
                  : 'text-secondary-dim bg-secondary/10'
              }`}>
                {project.tag}
              </span>
            </div>
            <h3 className="text-3xl font-bold font-headline mb-2 text-cyan-50">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm text-on-surface-variant mb-4">{project.subtitle}</p>
            )}
            <p className="text-on-surface-variant leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-2 bg-primary-fixed text-on-primary-fixed font-bold px-6 py-2.5 rounded-full neon-glow-primary-hover transition-all">
                <span className="material-symbols-outlined text-lg">rocket_launch</span>
                View Project
              </span>
              {project.gitHubLink && (
                <span className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">code</span>
                  Source
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={project.link}
      className={`group relative bg-surface-container-highest/40 glass-panel rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 ${glowClass} no-underline text-inherit`}
    >
      {/* Icon Header */}
      <div className="h-48 overflow-hidden relative bg-gradient-to-br from-surface-container-high to-surface-container-lowest flex items-center justify-center">
        <span
          className="material-symbols-outlined text-7xl text-cyan-400/20 group-hover:text-cyan-400/40 transition-all duration-500 group-hover:scale-110"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {project.icon}
        </span>
        <div className="absolute bottom-4 left-6">
          <span className={`text-[10px] font-label uppercase tracking-widest px-2 py-1 rounded ${
            project.tagColor === 'primary'
              ? 'text-primary-fixed bg-primary/10'
              : 'text-secondary-dim bg-secondary/10'
          }`}>
            {project.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold font-headline mb-1 text-cyan-50">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-xs text-on-surface-variant mb-3">{project.subtitle}</p>
        )}
        <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
          {project.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-4">
            <span className="text-secondary hover:text-secondary-fixed transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                {project.icon}
              </span>
            </span>
            <span className="text-secondary hover:text-secondary-fixed transition-colors">
              <span className="material-symbols-outlined">code</span>
            </span>
          </div>
          <span className="flex items-center gap-2 text-sm font-bold text-primary-fixed group-hover:gap-3 transition-all">
            View Project
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);
  const categoryProjects = getProjectsByCategory(categoryId);

  if (!category) {
    // Show all categories overview
    return (
      <div>
        <header className="mb-16 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest text-secondary font-label font-bold">
              All Categories
            </span>
          </div>
          <h2 className="text-5xl font-extrabold text-on-surface font-headline tracking-tighter mb-4">
            Project{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed">
              Categories
            </span>
          </h2>
          <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl">
            Browse projects by domain and technology focus area.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className="group relative bg-surface-container-highest/40 glass-panel rounded-lg p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(0,245,245,0.3)] no-underline text-inherit"
            >
              <div className="p-4 w-fit rounded-lg bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <span className="material-symbols-outlined text-3xl text-cyan-400">
                  {cat.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-3 text-cyan-50">
                {cat.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {cat.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                  cat.badgeColor === 'primary' ? 'text-cyan-300' : 'text-fuchsia-300'
                }`}>
                  {getProjectsByCategory(cat.id).length} Projects
                </span>
                <span className="material-symbols-outlined text-cyan-400 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <header className="mb-16 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-widest text-secondary font-label font-bold">
            {category.badge}
          </span>
        </div>
        <h2 className="text-5xl font-extrabold text-on-surface font-headline tracking-tighter mb-4">
          {category.title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed">
            {category.title.split(' ').slice(-1)}
          </span>
        </h2>
        <p className="text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl">
          {category.description}
        </p>
      </header>

      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-on-surface-variant">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link to="/categories" className="hover:text-cyan-400 transition-colors">Categories</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-cyan-300">{category.title}</span>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
