import type { I18nProvider } from "@refinedev/core";

const translations: Record<string, string> = {
  // 성공 메시지
  "Successful": "성공",
  "Successfully created user": "사용자가 성공적으로 생성되었습니다",
  "Successfully updated user": "사용자가 성공적으로 수정되었습니다",
  "Successfully deleted user": "사용자가 성공적으로 삭제되었습니다",
  "Successfully created": "성공적으로 생성되었습니다",
  "Successfully updated": "성공적으로 수정되었습니다",
  "Successfully deleted": "성공적으로 삭제되었습니다",

  // 일반적인 성공 메시지
  "Created successfully": "성공적으로 생성되었습니다",
  "Updated successfully": "성공적으로 수정되었습니다",
  "Deleted successfully": "성공적으로 삭제되었습니다",
  "Saved successfully": "성공적으로 저장되었습니다",

  // 오류 메시지
  "Error": "오류",
  "Something went wrong": "문제가 발생했습니다",
  "An error occurred": "오류가 발생했습니다",
  "Failed to create": "생성에 실패했습니다",
  "Failed to update": "수정에 실패했습니다",
  "Failed to delete": "삭제에 실패했습니다",
  "Network error": "네트워크 오류",

  // 확인 메시지
  "Are you sure?": "정말로 실행하시겠습니까?",
  "Are you sure you want to delete?": "정말로 삭제하시겠습니까?",
  "This action cannot be undone": "이 작업은 되돌릴 수 없습니다",

  // 버튼 텍스트
  "Save": "저장",
  "Cancel": "취소",
  "Delete": "삭제",
  "Edit": "수정",
  "Create": "생성",
  "Update": "수정",
  "Yes": "예",
  "No": "아니오",
  "OK": "확인",

  // 페이지 타이틀
  "Show": "상세보기",
  "List": "목록",

  // 폼 관련
  "Required": "필수",
  "Optional": "선택사항",
  "Invalid": "올바르지 않음",
  "Please enter": "입력해주세요",
  "Please select": "선택해주세요",

  // 로딩 메시지
  "Loading": "로딩 중...",
  "Saving": "저장 중...",
  "Deleting": "삭제 중...",
  "Processing": "처리 중...",

  // 데이터 관련
  "No data": "데이터 없음",
  "No records found": "데이터를 찾을 수 없습니다",
  "Empty": "비어있음",

  // 페이지네이션
  "Previous": "이전",
  "Next": "다음",
  "Page": "페이지",
  "Go to": "이동",
  "Total": "총",
  "items": "개",

  // 사용자 관련 특정 메시지
  "users": "사용자",
  "User": "사용자",
  "Users": "사용자 관리",
  "user": "사용자",

  // 네비게이션
  "Dashboard": "대시보드",
  "Posts": "게시물",
  "Categories": "카테고리",

  // Refine 내부 메시지들
  "notifications.success": "성공",
  "notifications.error": "오류",
  "notifications.undoable.timeout": "작업이 취소됩니다",
  "notifications.undoable.undo": "실행 취소",
  "notifications.undoable.notification": "{{seconds}}초 후에 작업이 실행됩니다",

  // CRUD 작업 메시지들 (실제 Refine 키들)
  "notifications.createSuccess": "성공적으로 생성되었습니다",
  "notifications.createError": "생성 중 오류가 발생했습니다.",
  "notifications.updateSuccess": "성공적으로 수정되었습니다",
  "notifications.updateError": "수정 중 오류가 발생했습니다.",
  "notifications.editSuccess": "성공적으로 수정되었습니다",
  "notifications.editError": "수정 중 오류가 발생했습니다",
  "notifications.deleteSuccess": "성공적으로 삭제되었습니다",
  "notifications.deleteError": "삭제 중 오류가 발생했습니다.",
  "notifications.importProgress": "{{processed}}/{{total}} 가져오기 진행 중",

  // 버튼 메시지
  "buttons.create": "생성",
  "buttons.save": "저장",
  "buttons.logout": "로그아웃",
  "buttons.delete": "삭제",
  "buttons.edit": "수정",
  "buttons.cancel": "취소",
  "buttons.confirm": "확인",
  "buttons.filter": "필터",
  "buttons.clear": "지우기",
  "buttons.refresh": "새로고침",
  "buttons.show": "보기",
  "buttons.undo": "실행 취소",
  "buttons.import": "가져오기",
  "buttons.clone": "복제",
  "buttons.notAccessTitle": "접근할 수 없습니다",

  // 테이블 관련
  "table.actions": "작업",

  // 폼 검증
  "errors.required": "이 필드는 필수입니다",
  "errors.validEmail": "올바른 이메일 주소를 입력해주세요",
  "errors.requiredField": "이 필드는 필수입니다",

  // 추가 Refine 메시지들
  "pages.login.title": "로그인",
  "pages.login.signin": "로그인",
  "pages.register.title": "회원가입",
  "pages.forgotPassword.title": "비밀번호 찾기",
  "pages.error.info": "죄송합니다. 오류가 발생했습니다.",
  "pages.error.404": "죄송합니다. 페이지를 찾을 수 없습니다.",
  "pages.error.resource404": "죄송합니다. 리소스를 찾을 수 없습니다.",
  "pages.error.backHome": "홈으로 돌아가기",

  // Ant Design Form 메시지들
  "warnWhenUnsavedChanges": "저장하지 않은 변경사항이 있습니다. 정말로 나가시겠습니까?",
  "loading": "로딩 중...",

  // 기타 자주 사용되는 메시지들
  "actions": "작업",
  "dashboard.title": "대시보드",

  // 리소스별 특정 키들 (필요한 경우에만 사용)
  "users.users": "사용자",

  // 일반적인 타이틀 키들
  "titles.list": "목록",
  "titles.create": "생성",
  "titles.edit": "수정",
  "titles.show": "상세",
  "titles.clone": "복제",

  // 일반적인 액션 키들 (meta.label과 조합용)
  "actions.list": "목록",
  "actions.create": "생성",
  "actions.edit": "수정",
  "actions.show": "상세",
  "actions.clone": "복제",

  // 기타 공통 키들
  "fields.id": "ID",
  "fields.name": "이름",
  "fields.email": "이메일",
  "fields.createdAt": "생성일",
  "fields.updatedAt": "수정일",
};

export const i18nProvider: I18nProvider = {
  translate: (key: string, params?: any) => {
    // 번역된 텍스트 가져오기
    let translation = translations[key] || key;

    // 매개변수가 있는 경우 치환
    if (params && typeof params === 'object') {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{{${paramKey}}}`, params[paramKey]);
      });
    }

    return translation;
  },
  changeLocale: () => Promise.resolve(),
  getLocale: () => "ko",
}; 