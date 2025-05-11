
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LabTestForm from "@/components/lab-tests/LabTestForm"
import LabTestList from "@/components/lab-tests/LabTestList"
import Button from "@/components/ui/Button"
import { labTestsService } from "@/services/labTestsService"
import type { LabTest, LabTestFormData } from "@/types/labTest"
import { ArrowLeft, Plus } from 'lucide-react'
import styles from "./ExamenesLaboratorioPage.module.css"

export default function ExamenesLaboratorioPage() {
  const [labTests, setLabTests] = useState<LabTest[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view" | null>(null)
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchLabTests()
  }, [])

  const fetchLabTests = async () => {
    try {
      setLoading(true)
      const response = await labTestsService.getLabTests()
      setLabTests(response.data.items || response.data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching lab tests:", err)
      setError("Error al cargar los exámenes de laboratorio")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTest = () => {
    setSelectedTest(null)
    setModalMode("create")
  }

  const handleEditTest = (test: LabTest) => {
    setSelectedTest(test)
    setModalMode("edit")
  }

  const handleViewTest = (test: LabTest) => {
    setSelectedTest(test)
    setModalMode("view")
  }

  const handleCloseModal = () => {
    setModalMode(null)
    setSelectedTest(null)
  }

  const handleSubmitTest = async (testData: LabTestFormData) => {
    try {
      if (modalMode === "create") {
        await labTestsService.createLabTest(testData)
      } else if (modalMode === "edit" && selectedTest) {
        await labTestsService.updateLabTest(selectedTest.id, testData)
      }

      handleCloseModal()
      fetchLabTests()
    } catch (err) {
      console.error("Error saving lab test:", err)
      setError("Error al guardar el examen de laboratorio")
    }
  }

  const handleDeleteTest = async (id: string) => {
    if (window.confirm("¿Está seguro que desea eliminar este examen?")) {
      try {
        await labTestsService.deleteLabTest(id)
        fetchLabTests()
      } catch (err) {
        console.error("Error deleting lab test:", err)
        setError("Error al eliminar el examen de laboratorio")
      }
    }
  }

  const handleReturnToHome = () => {
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <Button variant="ghost" onClick={handleReturnToHome} className={styles.backButton}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className={styles.title}>Exámenes de Laboratorio</h1>
        </div>
        <Button onClick={handleCreateTest} className={styles.createButton}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Examen
        </Button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando exámenes...</p>
        </div>
      ) : labTests.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No hay exámenes de laboratorio registrados</p>
          <Button onClick={handleCreateTest} className="mt-4">
            Crear primer examen
          </Button>
        </div>
      ) : (
        <LabTestList
          labTests={labTests}
          onView={handleViewTest}
          onEdit={handleEditTest}
          onDelete={handleDeleteTest}
        />
      )}

      {modalMode && (
        <div className={styles.modalBackdrop} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>
                {modalMode === "create"
                  ? "Nuevo Examen de Laboratorio"
                  : modalMode === "edit"
                  ? "Editar Examen de Laboratorio"
                  : "Ver Examen de Laboratorio"}
              </h2>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <LabTestForm labTest={selectedTest} onSubmit={handleSubmitTest} readOnly={modalMode === "view"} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
