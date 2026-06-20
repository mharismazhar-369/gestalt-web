"use client";
import React from "react";
import { motion } from "motion/react";
import { Briefcase, Award } from "lucide-react";
import Image from "next/image";

export default function TeamSection() {
  return (
    <section id="team" className="py-20 bg-background text-foreground border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
            Leadership & Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             Experienced professionals combining industry experience, strategic insight, and digital innovation to help organizations operate more effectively by delivering technology-enabled solutions and operational support for evolving business needs.
          </p>
        </div>

        {/* 4-Box Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Box 1: CEO Profile (Primary Token Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-primary/20 bg-primary/5 rounded-3xl p-8 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                
                {/* CEO Picture */}
                <div className="w-16 h-16 bg-background border border-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-inner">
                  <Image 
                    src="/ceo-pic.jpg" 
                    alt="Chief Executive Officer" 
                    width={64} 
                    height={64} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground">Founder</h3>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">MHM</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                MHM is an accomplished professional bringing over 20 years of diverse expertise spanning Human Resources, Administration, Business Development, IT, and Document Control. Throughout his career, he has driven operational excellence across high-stakes industries, including Engineering Consultancy, Oil & Gas, Telecommunications, and Education. Most recently serving as Manager Operations and previously as Chief of Staff and HR & Admin Ops Manager, he excels in streamlining complex workflows, leading cross-functional teams, and implementing scalable policies tailored to both enterprise and startup dynamics. A certified expert in deploying cutting-edge AI-powered HR solutions, he has successfully integrated cloud-based payroll systems and spearheaded digital transformation initiatives. With a strong foundation in process optimization, vendor management, and IT infrastructure, coupled with a passion for SaaS logic development and AI learning, he aligns organizational capabilities with sustainable, forward-looking growth strategies.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/40 text-xs font-mono text-primary">
              Execution | Strategy | Operations | Business Developemt | Human Resources
            </div>
          </motion.div>

          {/* Box 2: CFO Profile (Teal Token Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-teal-500/20 bg-teal-500/5 rounded-3xl p-8 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                
                {/* CFO Picture */}
                <div className="w-16 h-16 bg-background border border-teal-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-inner">
                  <Image 
                    src="/cfo-pic.jpg" 
                    alt="Chief Financial Officer" 
                    width={64} 
                    height={64} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground">Co-Founder</h3>
                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">AK</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                AK is a seasoned financial executive currently serving as Chief Financial Officer, bringing nearly two decades of extensive experience in corporate finance, financial reporting, and audit management. With a robust foundation as an ACCA professional , AK has consistently driven financial strategy and operational accountability across diverse technology and corporate organizations, including dinCloud Pakistan, Apoyo Tech, and Ovex Technologies. His expertise spans complex fiscal domains such as SOX compliance, ERF loan management, FBR tax regulations, and internal auditing. Equipped with profound proficiency in major ERP and accounting platforms like QuickBooks, MS GreatPlains, and SAGE , AK excels in supervising meticulous annual closings, optimizing financial workflows, and delivering transparent management reporting for both local and international portfolios. He is dedicated to establishing the financial structural integrity necessary to foster continuous organizational development and sustainable market success
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/40 text-xs font-mono text-teal-600 dark:text-teal-400">
              Complaince | Audit | Tax | Accounting | Integration
            </div>
          </motion.div>

          {/* Box 3: Experience Heading 1 (Purple Token Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="border border-purple-500/20 bg-purple-500/5 rounded-3xl p-8 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-400">
                <Briefcase className="w-5 h-5" />
                <h3 className="text-xl font-bold text-foreground">Domain Expertise</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 text-justify">
                With over 20 years of diverse professional experience, our leadership brings profound expertise specifically focused in the fields of Operations, Human Resources, Administration, Business Development, Document Control, and Information Technology. This extensive background spans high-stakes industries, including Engineering Consultancy, Oil & Gas Refineries, Education, and Telecommunications, ensuring a versatile and resilient approach to organizational growth.
              </p>
              <ul className="space-y-2 text-xs font-medium text-muted-foreground text-justify">
                <li className="flex items-center gap-2">• Operations & Strategic Management: Proven ability to oversee day-to-day operations, develop strategies that enhance productivity, and coordinate cross-functional activities for seamless business execution. Experience includes operating as a Chief of Staff to manage executive agendas, streamline operational inefficiencies, and act as a pivotal liaison between leadership and departmental teams</li>
                <li className="flex items-center gap-2">• Human Resources Leadership: Comprehensive management of HR functions, including recruitment, onboarding, performance appraisals, and complex payroll systems. Certified in implementing cutting-edge, cloud-based HR software (such as PayPeople) and highly skilled in developing organizational policies that ensure strict compliance with labor laws</li>
                <li className="flex items-center gap-2">• Administration & Resource Optimization: Strong track record of directing corporate administration, managing vendor relationships, handling procurement, and overseeing budget and invoice processing via platforms like QuickBooks. Additional expertise in managing security operations, facility maintenance, and vehicle fleets for industrial sites.</li>
                <li className="flex items-center gap-2">• Business Development & Document Control: Strategic identification of market opportunities through PSDP projects and complex tender documentation. Highly proficient in coordinating comprehensive project documentation, EOIs, and records for both national and international portfolios</li>
                <li className="flex items-center gap-2">• IT & Systems Integration: Capable of managing IT resources, networks, and operational software ecosystems to meet modern business objectives. Proficient in leveraging tools like MS Office 360 Admin, Slack, Teams, Notion, and various CRM software platforms to drive internal alignment and automation.</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-border/40 text-xs font-mono text-purple-600 dark:text-purple-400">
              Execution | Strategy | Operations | Business Developemt | Human Resources
            </div>
          </motion.div>

          {/* Box 4: Experience Heading 2 (Foreground Token Style) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border border-foreground/20 bg-foreground/5 rounded-3xl p-8 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-3 mb-4 text-foreground">
                <Award className="w-5 h-5" />
                <h3 className="text-xl font-bold text-foreground">Domain Expertise</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 text-justify">
                With nearly two decades of proven professional experience, our financial leadership brings profound expertise specifically focused on the fields of Accounting, Corporate Finance, Internal Audit, Regulatory Compliance, Taxation, and Financial Management. This extensive background spans both local and international technology and corporate sectors, driving financial structural integrity and strategic fiscal oversight.
              </p>
              <ul className="space-y-2 text-xs font-medium text-muted-foreground text-justify">
                <li className="flex items-center gap-2">• Corporate Finance & Accounting Operations: Directed daily accounting operations, supervised payable departments, and ensured rigorous monthly and annual closing of books of accounts across multiple organizations. Proven track record in managing funds for associated companies and provident funds, alongside overseeing complex banking arrangements, including ERF loans and comprehensive bank reconciliations.</li>
                <li className="flex items-center gap-2">• Audit, Compliance & Taxation: Spearheaded internal audit procedures and handled corporate tax filings. Extensive experience coordinating with the FBR in all matters of Income Tax and Sales Tax (including audits), filing Withholding Tax Returns, and ensuring strict compliance with internal controls, policies, and procedures, including SOX</li>
                <li className="flex items-center gap-2">• Financial Reporting & Budgeting: Orchestrated the preparation of Financial Statements, Management Accounts, and Annual Budgets for both internal operations and outsourced clients. Highly skilled in delivering precise management and foreign client reporting, which involves complex invoicing and receivables coordination.</li>
                <li className="flex items-center gap-2">• Global Bookkeeping & Financial Systems: Managed extensive bookkeeping and accountancy for international and local clients across the United States, Australia, and Pakistan. Exceptionally proficient in deploying and navigating diverse financial accounting systems and ERPs, including QuickBooks (Online and Desktop), MS GreatPlains, SAGE, MYOB, Peachtree, Zoho, and SASSU.</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-border/40 text-xs font-mono text-foreground/70">
              Complaince | Audit | Tax | Accounting | Integration
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}