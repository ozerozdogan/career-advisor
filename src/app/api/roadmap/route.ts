import { NextResponse } from 'next/server';
import { z } from 'zod';

interface RequestBody {
  jobTitle: string;
}

interface RoadmapNode {
  id: string;
  name: string;
  description: string;
  type?: 'primary' | 'secondary' | 'tertiary';
}

interface RoadmapLink {
  source: string;
  target: string;
  type: string;
}

interface RoadmapData {
  nodes: RoadmapNode[];
  links: RoadmapLink[];
}

const JobTitleSchema = z.string()
  .min(1, { message: "Job title cannot be empty" })
  .regex(/^[a-zA-Z\s\/-]+$/, { message: "Job title can only contain letters, spaces, hyphens, and forward slashes" });

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;

    const validationResult = JobTitleSchema.safeParse(body.jobTitle);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.format()._errors.join(', ');
      return NextResponse.json(
        { message: errorMessage },
        { status: 400 }
      );
    }

    const jobTitle = validationResult.data;
    
    const validationResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'model': 'google/gemini-flash-1.5-8b',
        'messages': [
          {
            'role': 'user',
            'content': `Is "${jobTitle}" a valid job title? Answer only with "yes" or "no".`
          }
        ],
        'provider': {
          'sort': 'price'
        }
      })
    });

    const validationData = await validationResponse.json();
    const isValid = validationData.choices[0].message.content.toLowerCase().includes('yes');

    if (!isValid) {
      return NextResponse.json(
        { message: 'Please enter a valid job title' },
        { status: 400 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'model': process.env.OPENROUTER_MODEL,
        'messages': [
          {
            'role': 'user',
            'content': `Generate a detailed learning roadmap for a ${jobTitle}. The response MUST be a valid JSON object with the following structure:
            {
              "nodes": [
                {
                  "id": "string",
                  "name": "string (short title)",
                  "description": "string (concise explanation, max 300 chars)",
                  "type": "primary | secondary | tertiary",
                  "group": "string (group name)"
                }
              ],
              "links": [
                {
                  "source": "string (parent node id)",
                  "target": "string (child node id)",
                  "type": "string"
                }
              ]
            }

            Requirements for the roadmap structure:
            1. Create a hierarchical structure with main categories and their sub-components
            2. Use appropriate node types to indicate importance:
              - primary: Very Important (light blue background)
              - secondary: Important (yellow background)
              - tertiary: Normal (light orange background)
            3. Group related technologies and concepts together
            4. Create meaningful connections between nodes

            For example, for a DevOps role, the structure would include:
            1. Learn programming languages:
              - Python (primary)
              - Golang (secondary)
              - JavaScript (tertiary)
              - Ruby (tertiary)

            2. Server Administration:
              - Linux (primary)
              - Unix (secondary)
              - Windows (secondary)

            3. Network and Security:
              - TCP/IP Fundamentals (primary)
              - Protocols: DNS, HTTP/S, FTP, SSL (secondary)

            4. Servers:
              Web servers:
                - Apache (primary)
                - Nginx (primary)
                - Tomcat (secondary)
                - IIS (tertiary)
                - Jetty (tertiary)
              Caching:
                - Redis (primary)
                - Memcache (secondary)
              Database:
                NoSQL:
                  - MongoDB (primary)
                  - Cassandra (primary)
                  - AWS DynamoDB (primary)
                  - Google Datastore (secondary)
                SQL:
                  - Oracle DB (tertiary)
                  - MySQL/MariaDB (primary)
                  - PostgreSQL (primary)
                  - MS-SQL (secondary)

            5. Infrastructure as code:
              Configuration Management:
                - Ansible (primary)
                - Puppet (secondary)
                - Chef (secondary)
                - Salt Stack (secondary)
              Container:
                - Docker (primary)
                - rkt (secondary)
                - LXC (tertiary)
              Container Orchestrators:
                - Kubernetes (primary)
                - OpenShift (secondary)
                - NoMad (tertiary)
                - Docker Swarm (tertiary)
              Infrastructure Provisioning:
                - Terraform (primary)
                - AWS CloudFormation (secondary)
                - Azure template (tertiary)
                - Google Deployment Manager (tertiary)

            6. CI/CD:
              - Jenkins (primary)
              - TeamCity (secondary)
              - Circle CI (secondary)
              - Travis CI (secondary)
              - AWS Code Pipeline (secondary)
              - Google Cloudbuild (secondary)
              - GitLab CI (tertiary)
              - Bitbucket Pipeline (tertiary)
              - Github Action (tertiary)

            7. Monitoring and Logging:
              Monitoring:
                - Zabbix (primary)
                - Prometheus (primary)
                - Grafana (primary)
                - DataDog (secondary)
                - New Relic (secondary)
                - CheckMK (secondary)
              Logging:
                - ELK (primary)
                - Graylog (secondary)
                - Splunk (secondary)

            8. Clouds:
              - AWS (primary)
              - Azure (secondary)
              - GCP (secondary)
              - OpenStack (tertiary)
              - Alicloud (tertiary)
              - IBM Bluemix (tertiary)

            For the requested job title, create a similar structure with:
            1. Main categories relevant to the role
            2. Sub-categories where appropriate
            3. Technologies and concepts with proper importance levels
            4. Clear grouping and hierarchy
            5. Proper descriptions for each node that explain:
              - What it is
              - Why it's important
              - Key concepts to learn
              - Prerequisites if any`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { message: 'Failed to generate roadmap. Please try again later.' },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    
    const content = data.choices[0].message.content;
    console.log(content);
    let roadmapData: RoadmapData;
    
    try {
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                        content.match(/```([\s\S]*?)```/) ||
                        content.match(/\{[\s\S]*\}/);
                        
      if (jsonMatch) {
        try {
          roadmapData = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        } catch (parseError) {
          console.error('Error parsing JSON from AI response:', parseError);
          return NextResponse.json(
            { message: 'Failed to parse roadmap data from AI response.' },
            { status: 500 }
          );
        }
      } else {
        roadmapData = {
          nodes: [{ id: '1', name: 'Start', description: 'Starting point' }],
          links: []
        };
        
        const paragraphs = content.split('\n\n');
        paragraphs.forEach((para: string, index: number) => {
          if (para.trim() && index > 0) {
            const nodeId = (index + 1).toString();
            roadmapData.nodes.push({
              id: nodeId,
              name: para.split('.')[0] || `Step ${index}`,
              description: para
            });
            
            roadmapData.links.push({
              source: index.toString(),
              target: nodeId,
              type: 'next-step'
            });
          }
        });
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      roadmapData = {
        nodes: [
          { id: '1', name: 'Error', description: 'Failed to parse roadmap data' }
        ],
        links: []
      };
    }
    
    return NextResponse.json(roadmapData);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
} 