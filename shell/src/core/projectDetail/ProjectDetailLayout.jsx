import React from 'react';
import { Link } from 'react-router-dom';

const ProjectDetailLayout = ({
  title,
  subtitle,
  description,
  tag,
  tagColor = 'primary',
  icon,
  stats,
  gitHubLink,
  category,
  categoryTitle,
  children,
  codeSnippet,
  codeFilename,
  datasets,
  images,
  architecture,
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Header Section */}
      <section className="relative w-full rounded-xl overflow-hidden shadow-2xl group mb-16">
        <div className="h-[400px] bg-gradient-to-br from-surface-container-high via-surface-container-low to-surface-container-lowest flex items-center justify-center">
          <span
            className="material-symbols-outlined text-[12rem] text-cyan-400/10 group-hover:text-cyan-400/20 transition-all duration-700"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest text-primary-fixed-dim font-bold">
                {tag}
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface font-headline">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {gitHubLink && (
            <a
              href={gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative flex items-center gap-3 px-8 py-4 bg-primary-fixed rounded-xl text-on-primary-fixed font-bold hover:scale-105 transition-all glow-cyan overflow-hidden no-underline"
            >
              <span className="material-symbols-outlined">code</span>
              <span>View Source</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            </a>
          )}
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-on-surface-variant">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        {category && (
          <>
            <Link to={`/categories/${category}`} className="hover:text-cyan-400 transition-colors">
              {categoryTitle}
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </>
        )}
        <span className="text-cyan-300">{title}</span>
      </div>

      {/* Detailed Content Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Core Narrative */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Project Overview */}
          <div className="glass-panel p-10 rounded-lg space-y-6">
            <h2 className="text-3xl font-bold text-cyan-50 font-headline">
              Project Overview
            </h2>
            <div className="space-y-4 text-on-surface-variant leading-loose font-body">
              <p>{description}</p>
              {children}
            </div>

            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-3 gap-6 pt-6">
                {Object.entries(stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-surface-container-high/50 p-6 rounded-lg border border-outline-variant/10"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2 font-label">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-3xl font-black text-cyan-400">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Code Block Section */}
          {codeSnippet && (
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/15 overflow-hidden">
              <div className="bg-surface-container-high px-6 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-error/30"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary/30"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/30"></div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">
                  {codeFilename || 'code.py'}
                </span>
              </div>
              <pre className="p-8 text-sm font-mono text-cyan-200/80 leading-relaxed overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Right Column: Metadata & Technical Specs */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Datasets */}
          {datasets && datasets.length > 0 && (
            <div className="glass-panel p-8 rounded-lg glow-fuchsia">
              <h3 className="text-xl font-bold mb-6 text-on-surface font-headline">
                Dataset Composition
              </h3>
              <ul className="space-y-6">
                {datasets.map((dataset, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary mt-1">
                      {dataset.icon || 'dataset'}
                    </span>
                    <div>
                      <p className="font-bold text-on-surface">{dataset.name}</p>
                      <p className="text-xs text-on-surface-variant">
                        {dataset.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sample Outputs */}
          {images && images.length > 0 && (
            <div className="glass-panel p-8 rounded-lg bg-surface-container-high/40">
              <h3 className="text-xl font-bold mb-6 text-on-surface font-headline">
                Sample Outputs
              </h3>
              <div className="space-y-4">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative group rounded-xl overflow-hidden aspect-video border border-outline-variant/10"
                  >
                    <img
                      src={img}
                      alt={`Output ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white text-4xl">
                        fullscreen
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture */}
          {architecture && (
            <div className="p-8 rounded-lg bg-gradient-to-br from-surface-container-high to-surface-container-lowest border border-outline-variant/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-cyan-400">
                    psychology
                  </span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">
                    Architecture
                  </p>
                  <p className="text-lg font-bold text-on-surface">
                    {architecture.name}
                  </p>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {architecture.description}
              </p>
              {gitHubLink && (
                <a
                  href={gitHubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 border border-outline-variant text-on-surface-variant text-sm font-bold rounded-xl hover:bg-surface-variant hover:text-on-surface transition-colors text-center no-underline"
                >
                  Technical Notebook
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailLayout;
