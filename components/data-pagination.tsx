import { Button } from "@/components/ui/button"

interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const DataPagination = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <div className="text-sm text-muted-foreground">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages || 1}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}