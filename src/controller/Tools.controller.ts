import { CustomError } from '../models/CustomError';
import { ToolService } from '../service/Tools.service';
import { ErrorCode } from '../types/CustomError.types';

export class ToolControler {
  public static async getAllTools(req: any, res: any) {
    try {
      const tools = await ToolService.getAllTools();
      if (!tools || tools.length === 0) {
        throw new CustomError('No tools found', ErrorCode.TOOLS_NOT_FOUND);
      }
      return res.status(200).json(tools);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ code: error.code, error: error.message });
      }
      return res.status(500).json({ error: 'Fehler beim Abrufen der Tools' });
    }
  }

  public static async getToolById(req: any, res: any) {
    const { id } = req.params;
    try {
      if (typeof id !== 'string' || isNaN(Number(id))) {
        throw new CustomError('Invalid ID format', ErrorCode.INVALID_ID_FORMAT, 400);
      }
      const tool = await ToolService.getToolById(Number(id));
      if (!tool) {
        throw new CustomError('Tool not found', ErrorCode.TOOLS_NOT_FOUND, 200);
      }
      return res.status(200).json(tool);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ code: error.code, error: error.message });
      }
      return res.status(500).json({ error: 'Error on getToolsById' });
    }
  }
}
