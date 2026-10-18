// Skill groups from the CV. `proof` maps a skill to the project slug that demonstrates it.
export const skillGroups = [
  { id: 'ai', skills: ['PyTorch', 'TensorFlow', 'U-Net', 'CNN', 'Computer Vision'] },
  { id: 'frontend', skills: ['React', 'React Native', 'Vite.js', 'HTML/CSS'] },
  { id: 'backend', skills: ['Node.js', 'Express', 'Flask', 'REST APIs'] },
  { id: 'languages', skills: ['Python', 'JavaScript', 'PHP', 'C/C++', 'SQL'] },
  { id: 'blockchain', skills: ['Solidity', 'Ethereum', 'Web3'] },
  { id: 'data', skills: ['PostgreSQL', 'MySQL'] },
  { id: 'iot', skills: ['ROS', 'Gazebo', 'ESP32', 'Arduino'] },
  { id: 'tools', skills: ['Git', 'Docker', 'Photoshop', 'Premiere Pro', 'Audition'] },
]

export const skillProof = {
  'U-Net': 'p-segmentation',
  CNN: 'angel',
  'Computer Vision': 'p-segmentation',
  React: 'ci-pensa-ele',
  'React Native': 'gym-tracker',
  'Vite.js': 'p-segmentation',
  'Node.js': 'ci-pensa-ele',
  Express: 'ci-pensa-ele',
  Flask: 'angel',
  Solidity: '4ever',
  Ethereum: '4ever',
  Web3: '4ever',
  PostgreSQL: 'ci-pensa-ele',
  ROS: 'iot-balloon-caching',
  Gazebo: 'iot-balloon-caching',
  ESP32: 'gym-tracker',
  Arduino: 'gym-tracker',
}
