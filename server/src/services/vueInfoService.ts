import { LanguageModes } from '../modes/languageModes';
import { VueFileInfo, ComponentInfo } from '../modes/script/findComponents';
import { TextDocument } from 'vscode-languageserver';
import { getFileFsPath } from '../utils/paths';

export class VueInfoService {
  private vueFileInfo: Map<string, VueFileInfo> = new Map();

  constructor(private languageModes: LanguageModes) {}

  updateInfo(doc: TextDocument, info: VueFileInfo) {
    this.vueFileInfo.set(getFileFsPath(doc.uri), info);
  }

  getInfo(doc: TextDocument) {
    this.languageModes.getAllModesInDocument(doc).forEach(m => {
      if (m.updateFileInfo) {
        m.updateFileInfo(doc);
      }
    });
    return this.vueFileInfo.get(getFileFsPath(doc.uri));
  }
}
