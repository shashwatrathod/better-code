import * as vscode from 'vscode';
import { equalsIgnoreCase } from './utils';

/**
 * The GPT providers currently supported by the extension.
 */
export enum SupportedGptServices {
  ChatGPT = 'ChatGPT',
  Gemini = 'Gemini',
}

/**
 * Holds values for user-configured parameters.
 */
class Config {
  private static instance: Config;

  private DEFAULT_SERVICE_PERFERENCE = SupportedGptServices.Gemini;

  /**
   * @returns an instance of the Config holder.
   */
  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  /**
   * API key as configured by the user in the extension settings.
   */
  public get apiKey(): string | undefined {
    return vscode.workspace.getConfiguration('betterCode.apiKey').toString();
  }

  /**
   * Preference for the GPT provider as configured by the user in the extension settings.
   */
  public get servicePreference(): SupportedGptServices {
    const serviceName = vscode.workspace
      .getConfiguration('betterCode.servicePerference')
      .toString();
    const service = this.getSupportedGptServiceFromServiceName(serviceName);
    return service || this.DEFAULT_SERVICE_PERFERENCE;
  }

  private getSupportedGptServiceFromServiceName(
    serviceName: string,
  ): SupportedGptServices | null {
    if (equalsIgnoreCase(serviceName, 'ChatGPT')) {
      return SupportedGptServices.ChatGPT;
    } else if (equalsIgnoreCase(serviceName, 'Gemini')) {
      return SupportedGptServices.Gemini;
    } else {
      return null;
    }
  }
}

export default Config;
