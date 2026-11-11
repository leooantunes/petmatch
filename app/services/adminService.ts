import { auth, db } from "@/firebase";

/**
 * Admins são registrados na coleção `admins`, com o UID do usuário como ID
 * do documento. A coleção só pode ser alterada pelo console/Admin SDK
 * (ver firestore.rules), então o cliente não consegue se promover a admin.
 *
 * Esta verificação serve apenas para a UI: quem garante a permissão de
 * aprovar/rejeitar pets são as regras do Firestore.
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const uid = auth().currentUser?.uid;
  if (!uid) {
    return false;
  }

  try {
    const snapshot = await db().collection("admins").doc(uid).get();
    return snapshot.exists();
  } catch (error) {
    console.error("[adminService] Erro ao verificar permissão de admin:", error);
    return false;
  }
}
