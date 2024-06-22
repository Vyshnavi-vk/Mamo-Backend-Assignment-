import { Schema, model, Document, Types } from 'mongoose';

interface ProjectInterface extends Document {
    name: string;
    description: string;
    tags: string[];
    clientId: Types.ObjectId;
}

const projectSchema = new Schema<ProjectInterface>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Project = model<ProjectInterface>('Project', projectSchema);
export default Project
